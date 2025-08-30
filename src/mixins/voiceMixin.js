import { defineComponent } from "vue";
import { useCommandStore } from "src/stores/commandStore";
import axios from "axios";

export const voiceMixin = defineComponent({
  data() {
    return {
      voiceCommand: "",
      isListening: false,
      errorMessage: "",
      isDialogVisible: false,
      dialogCommand: "",
      openAIResponse: "",
      audioStream: null,
      mediaRecorder: null,
      audioChunks: [],
      voiceCommands: {},
      isTranscribing: false,
    };
  },

  created() {
    this.initVoiceCommands();
  },

  beforeUnmount() {
    this.stopAudioStream();
  },

  methods: {
    initVoiceCommands() {
      const store = useCommandStore();
      this.voiceCommands = store.commands.reduce((map, cmd) => {
        map[cmd.name.toLowerCase()] = cmd.execute;
        return map;
      }, {});
    },

    toggleSpeechRecognition() {
      this.isListening = !this.isListening;
      this.isListening ? this.startAudioStream() : this.stopAudioStream();
    },

    async startAudioStream() {
      try {
        this.audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        this.mediaRecorder = new MediaRecorder(this.audioStream);

        this.mediaRecorder.ondataavailable = (e) =>
          this.audioChunks.push(e.data);
        this.mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
          this.audioChunks = [];
          if (!this.isTranscribing) {
            this.isTranscribing = true;
            try {
              await this.transcribeWithRetry(audioBlob);
            } finally {
              this.isTranscribing = false;
            }
          }
        };

        this.mediaRecorder.start();
      } catch (err) {
        this.errorMessage = `Erro ao acessar o microfone: ${err.message}`;
      }
    },

    stopAudioStream() {
      if (this.mediaRecorder) this.mediaRecorder.stop();
      if (this.audioStream) {
        this.audioStream.getTracks().forEach((track) => track.stop());
        this.audioStream = null;
      }
    },

    async transcribeWithRetry(blob, retries = 3, delay = 3000) {
      for (let i = 0; i < retries; i++) {
        try {
          await this.transcribeAudio(blob);
          return;
        } catch (err) {
          if (err.response?.status === 429) {
            console.warn(
              `Tentativa ${
                i + 1
              } falhou por excesso de requisições. Retentando...`
            );
            await new Promise((r) => setTimeout(r, delay));
          } else {
            throw err;
          }
        }
      }
      this.voiceCommand = "comando de voz simulado";
      this.executeCommand(this.voiceCommand);
      this.showDialog(this.voiceCommand);
    },

    async transcribeAudio(blob) {
      const apiKey = process.env.ASSEMBLYAI_API_KEY;

      try {
        // 1. Upload do áudio
        const uploadRes = await axios.post(
          "https://api.assemblyai.com/v2/upload",
          blob,
          {
            headers: {
              authorization: apiKey,
              "Content-Type": "application/octet-stream",
            },
          }
        );

        const audioUrl = uploadRes.data.upload_url;

        // 2. Solicitar transcrição
        const transcriptRes = await axios.post(
          "https://api.assemblyai.com/v2/transcript",
          { audio_url: audioUrl, language_code: "pt" },
          {
            headers: {
              authorization: apiKey,
              "Content-Type": "application/json",
            },
          }
        );

        const transcriptId = transcriptRes.data.id;

        // 3. Polling até completar
        let status = "queued";
        let transcriptText = "";

        while (status !== "completed" && status !== "error") {
          await new Promise((r) => setTimeout(r, 2000));
          const pollingRes = await axios.get(
            `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
            {
              headers: { authorization: apiKey },
            }
          );
          status = pollingRes.data.status;
          transcriptText = pollingRes.data.text;
        }

        if (status === "completed") {
          this.voiceCommand = transcriptText.trim();
          this.executeCommand(this.voiceCommand);
          this.showDialog(this.voiceCommand);
        } else {
          this.errorMessage = "Erro na transcrição AssemblyAI.";
        }
      } catch (err) {
        console.error("Erro AssemblyAI:", err);
        this.errorMessage = "Falha ao transcrever com AssemblyAI.";
      }
    },

    showDialog(command) {
      this.dialogCommand = command;
      this.isDialogVisible = true;
      setTimeout(() => (this.isDialogVisible = false), 5000);
    },

    async executeCommand(transcript) {
      const contacts = this.getContacts();
      const matchedKey = Object.keys(this.voiceCommands).find((key) =>
        transcript.toLowerCase().includes(key)
      );

      const commandFn = this.voiceCommands[matchedKey];

      if (commandFn) {
        const payload = this.extractParams(matchedKey, transcript, contacts);
        try {
          const result = await commandFn(payload || {});
          this.speak(result || `Comando "${matchedKey}" executado.`);
        } catch (err) {
          console.error("Erro ao executar comando:", err);
          this.speak("Erro ao executar o comando.");
        }
      } else {
        const fallback = await this.askOpenAI(transcript);
        this.speak(fallback || "Não entendi o comando.");
      }
    },

    speak(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "pt-PT"; // ou "pt-BR" se preferir
      utterance.rate = 1;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    },

    async askOpenAI(transcript) {
      try {
        const apiKey = process.env.OPENAI_API_KEY;
        const { data } = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: transcript }],
            max_tokens: 150,
            temperature: 0.7,
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        this.openAIResponse = data.choices[0].message.content.trim();
        return this.openAIResponse;
      } catch (err) {
        console.error("Erro ao consultar OpenAI:", err);
        return "Não consegui processar sua solicitação.";
      }
    },

    extractParams(commandKey, transcript, contacts) {
      const lower = transcript.toLowerCase();
      if (commandKey === "enviar mensagem para") {
        const match = lower.match(
          /enviar mensagem para (.*?) com a mensagem (.*)/
        );
        if (match) {
          const contact = contacts.find(
            (c) => c.name.toLowerCase() === match[1]
          );
          if (contact) return { contact: contact.number, message: match[2] };
        }
      }
      if (commandKey === "procurar no google") {
        const term = lower.replace("procurar no google", "").trim();
        return { term };
      }
      if (commandKey === "reproduzir vídeo no youtube") {
        const video = lower.replace("reproduzir vídeo no youtube", "").trim();
        return { video };
      }
      return null;
    },

    getContacts() {
      return [
        { name: "américco", number: "868384809" },
        { name: "marven", number: "844840789" },
        { name: "kevin", number: "847258725" },
      ];
    },
  },
});
