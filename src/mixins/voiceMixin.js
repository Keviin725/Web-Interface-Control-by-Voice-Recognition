import { defineComponent } from "vue";
import commands from "../commands";

export const voiceMixin = defineComponent({
  data() {
    return {
      voiceCommand: "",
      isListening: false,
      errorMessage: "",
      voiceCommands: {},
      recognition: null,
      userVoiceCommands: {},
      isDialogVisible: false,
      dialogCommand: "",
    };
  },
  created() {
    this.initVoiceCommands();
    console.log("Voice commands initialized:", this.voiceCommands);
    this.onRecognitionResult = this.onRecognitionResult.bind(this); // Bind the Vue context to the method
  },
  beforeDestroy() {
    if (this.recognition) {
      this.recognition.stop();
    }
  },
  methods: {
    initVoiceCommands() {
      this.voiceCommands = commands.reduce((acc, command) => {
        acc[command.name.toLowerCase()] = command.execute;
        return acc;
      }, {});
    },
    toggleSpeechRecognition() {
      this.isListening = !this.isListening;
      if (this.isListening) {
        this.initSpeechRecognition();
      } else {
        this.stopSpeechRecognition();
      }
    },
    addCustomVoiceCommand(command, action) {
      this.userVoiceCommands[command] = action;
    },
    initSpeechRecognition() {
      if (!("webkitSpeechRecognition" in window)) {
        this.errorMessage = "Seu navegador não suporta o reconhecimento de voz";
        return;
      }

      // Include user's custom voice commands when initializing voice commands
      this.voiceCommands = { ...this.voiceCommands };

      this.recognition = new webkitSpeechRecognition();
      this.recognition.lang = 'pt-PT';
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.recognition.onstart = this.onRecognitionStart;
      this.recognition.onerror = this.onRecognitionError;
      this.recognition.onend = this.onRecognitionEnd;
      this.recognition.onresult = this.onRecognitionResult; // Use the method bound to the Vue context

      this.recognition.start();
    },
    onRecognitionStart() {
      console.log("Recognition started");
      this.isListening = true;
    },
    onRecognitionError(event) {
      console.log("Recognition error:", event.error);
      this.errorMessage = "Erro no reconhecimento de voz: " + event.error;
    },
    stopSpeechRecognition() {
      this.recognition.stop();
    },
    onRecognitionEnd() {
      console.log("Recognition ended");
      this.isListening = false;
    },
    speak(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-PT';
      window.speechSynthesis.speak(utterance);
    },
    onRecognitionResult(event) {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          const transcript = event.results[i][0].transcript.trim().toLowerCase();
          this.executeCommand(transcript);
          this.dialogCommand = transcript;
          this.isDialogVisible = true; // Show the dialog when a command is final
          setTimeout(() => {
            this.isDialogVisible = false; // Hide the dialog after 5 seconds
          }, 5000);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      this.voiceCommand = interimTranscript;
    },
    async executeCommand(transcript) {
      const commandKey = Object.keys(this.voiceCommands).find(key => transcript.includes(key));
      const commandFunction = this.voiceCommands[commandKey];
      if (typeof commandFunction === "function") {
        console.log("Executing command:", commandKey);

        // Extract parameters from the transcript
        let params;
        console.log("Transcript:", transcript);

        const removePunctuation = text => text.replace(/[.,!?]$/, '');

        if (commandKey === 'enviar mensagem para') {
          const match = transcript.match(/enviar mensagem para (.*?) com a mensagem (.*)/);
          if (match) {
            params = [removePunctuation(match[1]), removePunctuation(match[2])];
            console.log("Matched params:", params);
          } else {
            params = [];
          }
        } else if (commandKey === 'ligar para um contato') {
          const match = transcript.match(/ligar para um contato (.*)/);
          if (match) {
            params = [removePunctuation(match[1])];
            console.log("Matched params:", params);
          } else {
            params = [];
          }
        } else if (commandKey === 'reproduzir vídeo no youtube') {
          const match = transcript.match(/reproduzir vídeo no youtube sobre (.*)/);
          if (match) {
            params = [removePunctuation(match[1])];
            console.log("Matched params:", params);
          } else {
            params = [];
          }
        } else {
          params = transcript.replace(commandKey, '').trim().split(' ').map(removePunctuation);
        }

        console.log("Function:", commandFunction, "Params:", params);
        const result = await commandFunction.apply(this, params);
        if (result) {
          this.speak(result);
        } else {
          this.speak(`Comando ${commandKey} executado com sucesso.`);
        }
        this.recognition.stop();
      } else {
        this.speak(`Comando ${transcript} não encontrado.`);
      }
    },
  }
});
