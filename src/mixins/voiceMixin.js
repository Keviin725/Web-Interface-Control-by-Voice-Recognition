import { defineComponent } from "vue";

export const voiceMixin = defineComponent({
  data() {
    return {
      voiceCommand: "",
      isListening: false,
      errorMessage: "",
      voiceCommands: {},
      recognition: null,
      
    };
  },
  created() {
    this.voiceCommands = {
      "enviar": ()=> this.sendMessage(),
      "voltar": () => this.back(),
      "navegar para home": () => this.navigateToHome(),
      "abrir menu": () => this.openMenu(),
      "ativar modo escuro": () => this.toggleDarkMode(),
      ativar: () => this.toggleDarkMode(), // Alias for "ativar modo escuro"
      configurações: () => this.navigateToSettings(),
    };
    console.log("Voice commands initialized:", this.voiceCommands);
    this.onRecognitionResult = this.onRecognitionResult.bind(this); // Bind the Vue context to the method
  },
  beforeDestroy() {
    if (this.recognition) {
      this.recognition.stop();
    }
  },
  methods: {

    sendMessage() {
      if (this.voiceCommand.trim() !== '') {
        this.messages.push({
          text: this.voiceCommand,
          from: 'me'
        });
      }
      this.voiceCommand = '';
    },


    back() {
      console.log("Going back");
      this.$router.go(-1);
    },
    toggleDarkMode() {
      console.log("Toggling dark mode");
      this.$q.dark.toggle();
    },
    navigateToHome() {
      console.log("Navigating to home");
      this.$router.push("/");
    },
    navigateToSettings() {
      console.log("Navigating to settings");
      this.$router.push("/settings");
    },
    initSpeechRecognition() {
      if (!("webkitSpeechRecognition" in window)) {
        this.errorMessage = "Seu navegador não suporta o reconhecimento de voz";
        return;
      }

      this.recognition = new webkitSpeechRecognition();
      // this.recognition.lang = navigator.language || 'pt-PT'; // Use the browser's language
      this.recognition.lang = "pt-PT";
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.recognition.onstart = () => this.onRecognitionStart();
      this.recognition.onerror = (event) => this.onRecognitionError(event);
      this.recognition.onend = () => this.onRecognitionEnd();
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
    onRecognitionEnd() {
      console.log("Recognition ended");
      this.isListening = false;
    },
    onRecognitionResult(event) {
      console.log("Recognition result:", event);
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          let transcript = event.results[i][0].transcript.trim();
          console.log("Final transcript:", transcript);

          // Normalize the transcript: convert to lowercase and remove punctuation
          transcript = transcript
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

          // Execute o comando e fornecer feedback de voz
          this.executeCommand(transcript);
          break;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      this.voiceCommand = interimTranscript;
    },
    executeCommand(transcript) {
      const command = this.voiceCommands[transcript];
      if (typeof command === "function") {
        console.log("Executing command:", command);
        command.call(this);

        // Adicione feedback por voz
        this.speak(`Comando ${transcript} executado com sucesso.`);

        this.recognition.stop();
      }
    },
    speak(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "pt-PT";

      // Ajuste a velocidade da fala
      utterance.rate = 0.8; // Valor menor para fala mais lenta, valor maior para fala mais rápida

      window.speechSynthesis.speak(utterance);
    },
    startSpeechToText() {
      this.initSpeechRecognition();
      this.recognition.onresult = event => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            let transcript = event.results[i][0].transcript.trim();
            this.voiceCommand = transcript;
            // Se o comando de voz for "enviar", chame o método sendMessage
            if (this.voiceCommand === 'enviar') {
              this.sendMessage();
            }
            // Se o comando de voz for "parar", pare o reconhecimento de voz
            else if (this.voiceCommand.toLowerCase() === 'parar') {
              this.recognition.stop();
            }
            break;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        // Atribuir interimTranscript a voiceCommand apenas se interimTranscript não estiver vazio
        if (interimTranscript.trim() !== '') {
          this.voiceCommand = interimTranscript;
        }
      };
    },
  },
});
