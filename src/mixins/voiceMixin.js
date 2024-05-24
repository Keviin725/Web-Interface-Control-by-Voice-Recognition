import { defineComponent } from "vue";

export const voiceMixin = defineComponent({
  data() {
    return {
      voiceCommand: "",
      isListening: false,
      errorMessage: "",
      voiceCommands: {},
      recognition: null,
      userVoiceCommands: {}

    };
  },
  created() {
    this.voiceCommands = {
      "enviar": ()=> this.sendMessage(),
      "voltar": () => this.back(),
      "navegar para home": () => this.navigateToHome(),
      "abrir menu": () => this.openMenu(),
      "ativar modo escuro": () => this.toggleDarkMode(),
      'qual é a previsão do tempo':() => this.getWeather(),
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
    async getWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4c421c71d265b836f222fde614371d10&lang=pt&units=metric`);
          const data = await response.json();
          const temperature = data.main.temp;
          const description = data.weather[0].description;
          this.speak(`A temperatura atual é de ${temperature} graus Celsius. ${description}`);
        }, (error) => {
          console.error(error);
          this.speak('Não foi possível obter a sua localização.');
        });
      } else {
        this.speak('Geolocalização não é suportada por este navegador.');
      }
    },
    addCustomVoiceCommand(command, action){
      this.userVoiceCommands[command] = action
    },

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
      // Include user's custom voice commands when initializing voice commands
      this.voiceCommands = { ...this.voiceCommands, ...this.userVoiceCommands };

      this.recognition = new webkitSpeechRecognition();
      // Use the browser's language
      this.recognition.lang = navigator.language || 'pt-PT';
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

    speak(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = this.currentLanguage;
      window.speechSynthesis.speak(utterance);
    },

    onRecognitionResult(event) {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          const transcript = event.results[i][0].transcript.trim();
          this.executeCommand(transcript);
          break;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      this.voiceCommand = interimTranscript;
    },

    executeCommand(transcript) {
      const commandFunction = this.voiceCommands[transcript];
      if (typeof commandFunction === "function") {
        console.log("Executing command:", transcript);
        commandFunction.call(this);
        this.speak(`Comando ${transcript} executado com sucesso.`);
        this.recognition.stop();
      }
    },

    onRecognitionError(event) {
      console.error('Error occurred in recognition: ' + event.error);
      this.speak(`Ocorreu um erro: ${event.error}`);
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
