import { defineComponent } from "vue";
import { useCommandStore } from "src/stores/commandStore";
import axios from "axios";

export const voiceMixin = defineComponent({
  data() {
    return {
      voiceCommand: "",
      isListening: false,
      errorMessage: "",
      userVoiceCommands: {},
      isDialogVisible: false,
      dialogCommand: "",
      openAIResponse: "",
      audioStream: null,
      mediaRecorder: null, // Para gravar o áudio
      audioChunks: [], // Para armazenar os pedaços de áudio
    };
  },
  created() {
    this.initVoiceCommands();
  },
  beforeDestroy() {
    this.stopAudioStream();
  },
  methods: {
    initVoiceCommands() {
      const commandStore = useCommandStore();
      this.voiceCommands = commandStore.commands.reduce((acc, command) => {
        acc[command.name.toLowerCase()] = command.execute;
        return acc;
      }, {});
    },

    toggleSpeechRecognition() {
      this.isListening = !this.isListening;
      this.isListening ? this.startAudioStream() : this.stopAudioStream();
    },

    async startAudioStream() {
      try {
        this.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // Cria um MediaRecorder para gravar o áudio
        this.mediaRecorder = new MediaRecorder(this.audioStream);
        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data); // Adiciona pedaços de áudio
        };
        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' }); // Cria um Blob a partir dos pedaços
          this.transcribeAudio(audioBlob); // Inicia a transcrição do áudio
          this.audioChunks = []; // Limpa os pedaços
        };
        this.mediaRecorder.start(); // Começa a gravação

      } catch (error) {
        this.errorMessage = "Erro ao acessar o microfone: " + error.message;
      }
    },

    stopAudioStream() {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop(); // Para a gravação
      }
      if (this.audioStream) {
        const tracks = this.audioStream.getTracks();
        tracks.forEach(track => track.stop());
        this.audioStream = null;
      }
    },

    async transcribeAudio(audioBlob) {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav');
      formData.append('model', 'tts-1-hd'); // Use o modelo tts-1-hd

      try {
        const apiKey = process.env.OPENAI_API_KEY; // Substitua pela sua chave de API da OpenAI
        const response = await axios.post(
          "https://api.openai.com/v1/audio/transcriptions",
          formData,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        this.voiceCommand = response.data.text.trim();
        this.executeCommand(this.voiceCommand);
        this.showDialog(this.voiceCommand);
      } catch (error) {
        console.error("Erro ao transcrever áudio:", error);
        this.errorMessage = "Houve um erro ao transcrever o áudio.";
      }
    },

    showDialog(command) {
      this.dialogCommand = command;
      this.isDialogVisible = true;
      setTimeout(() => (this.isDialogVisible = false), 5000);
    },

    async executeCommand(transcript) {
      const contacts = this.getContacts();
      const commandKey = Object.keys(this.voiceCommands).find((key) =>
        transcript.includes(key)
      );
      const commandFunction = this.voiceCommands[commandKey];

      if (commandFunction) {
        const params = this.extractParams(commandKey, transcript, contacts);
        if (params) {
          const result = await commandFunction.apply(this, params);
          this.speak(result || `Comando ${commandKey} executado com sucesso.`);
        }
      } else {
        const response = await this.askOpenAI(transcript);
        this.speak(response || `Não foi possível entender o comando.`);
      }
    },

    async speak(text) {
      try {
        const apiKey = process.env.OPENAI_API_KEY;
        const response = await axios.post(
          "https://api.openai.com/v1/audio/speech",
          {
            model: "tts-1-hd", // Use o modelo tts-1-hd
            input: text,
            voice: "alloy" // Verifique se a voz "alloy" está disponível
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json"
            },
            responseType: 'blob'
          }
        );

        const audioUrl = URL.createObjectURL(new Blob([response.data]));
        const audio = new Audio(audioUrl);
        audio.play();
      } catch (error) {
        console.error("Erro ao gerar áudio:", error);
        this.errorMessage = "Houve um erro ao gerar o áudio.";
      }
    },

    async askOpenAI(transcript) {
      try {
        const apiKey = process.env.OPENAI_API_KEY;
        const response = await axios.post(
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

        this.openAIResponse = response.data.choices[0].message.content.trim();
        return this.openAIResponse;
      } catch (error) {
        console.error("Erro ao se comunicar com a OpenAI:", error);
        return "Houve um erro ao processar o comando.";
      }
    },

    extractParams(commandKey, transcript, contacts) {
      let params;
      if (commandKey === "enviar mensagem para") {
        const match = transcript.match(/enviar mensagem para (.*?) com a mensagem (.*)/);
        if (match) {
          const contact = contacts.find(c => c.name === match[1]);
          if (contact) params = [contact.number, match[2]];
        }
      }
      return params;
    },

    getContacts() {
      return [
        { name: "américco", number: "868384809" },
        { name: "marven", number: "844840789" },
        { name: "kevin", number: "847258725" }
      ];
    }
  }
});
