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
      this.voiceCommands = { ...this.voiceCommands};

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
      const commandFunction = this.voiceCommands[transcript];
      if (typeof commandFunction === "function") {
        console.log("Executing command:", transcript);
        const result = await commandFunction.call(this);
        if (result) {
          this.speak(result);
        } else {
          this.speak(`Comando ${transcript} executado com sucesso.`);
        }
        this.recognition.stop();
      } else {
        this.speak(`Comando ${transcript} não encontrado.`);
      }
    },
  }
});
