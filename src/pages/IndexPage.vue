<template>
  <q-page class="flex flex-center">
    <div class="text-center">
      <p class="text-subtitle1">Mensagem de boas-vindas</p>
      <div class="q-my-md">
        <p class="text-subtitle2">Comandos de voz suportados:</p>
        <ul>
          <li v-for="(command, index) in Object.keys(voiceCommands)" :key="index">
            {{ command }}
          </li>
        </ul>
      </div>
      <q-btn color="primary" round icon="mic" aria-label="Voice Command" @click="initSpeechRecognition" />
      <div class="q-my-md">
        <p class="text-subtitle2">Comando de voz: {{ voiceCommand }}</p>
      </div>

      <q-spinner v-if="isListening" color="primary" size="40px" />
      <q-banner v-if="voiceCommand" class="q-my-md text-positive">
        <b>Comando de voz reconhecido com sucesso! </b>
      </q-banner>
      <q-banner v-if="errorMessage" class="q-my-md" type="negative">
        {{ errorMessage }}
      </q-banner>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      voiceCommand: '',
      isListening: false,
      errorMessage: '',
      voiceCommands: {},
      recognition: null,
    }
  },
  created() {
    this.voiceCommands = {
      'navegar para home': () => this.navigateToHome(),
      'abrir menu': () => this.openMenu(),
      'ativar modo escuro': () => this.toggleDarkMode(),
      'ativar': () => this.toggleDarkMode(), // Alias for "ativar modo escuro"
      'configurações': () => this.navigateToSettings(),
    }
    console.log('Voice commands initialized:', this.voiceCommands);
    this.onRecognitionResult = this.onRecognitionResult.bind(this); // Bind the Vue context to the method
  },
  beforeDestroy() {
    if (this.recognition) {
      this.recognition.stop();
    }
  },
  methods: {
    toggleDarkMode() {
      console.log('Toggling dark mode');
      this.$q.dark.toggle()
    },
    navigateToHome() {
      console.log('Navigating to home');
      this.$router.push('/')
    },
    navigateToSettings(){
      console.log('Navigating to settings');
      this.$router.push('/settings')
    },
    initSpeechRecognition() {
      if (!('webkitSpeechRecognition' in window)) {
        this.errorMessage = 'Seu navegador não suporta o reconhecimento de voz'
        return
      }

      this.recognition = new webkitSpeechRecognition()
      this.recognition.lang = 'pt-PT'
      this.recognition.continuous = true
      this.recognition.interimResults = true

      this.recognition.onstart = () => this.onRecognitionStart();
      this.recognition.onerror = (event) => this.onRecognitionError(event);
      this.recognition.onend = () => this.onRecognitionEnd();
      this.recognition.onresult = this.onRecognitionResult; // Use the method bound to the Vue context

      this.recognition.start()
    },
    onRecognitionStart() {
      console.log('Recognition started');
      this.isListening = true;
    },
    onRecognitionError(event) {
      console.log('Recognition error:', event.error);
      this.errorMessage = 'Erro no reconhecimento de voz: ' + event.error
    },
    onRecognitionEnd() {
      console.log('Recognition ended');
      this.isListening = false;
    },
    onRecognitionResult(event) {
    console.log('Recognition result:', event);
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        let transcript = event.results[i][0].transcript.trim();
        console.log('Final transcript:', transcript);

        // Normalize the transcript: convert to lowercase and remove punctuation
        transcript = transcript.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

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
    if (typeof command === 'function') {
      console.log('Executing command:', command);
      command.call(this);

      // Adicione feedback por voz
      this.speak(`Comando ${transcript} executado com sucesso.`);
    }
  },
  speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-PT';
    window.speechSynthesis.speak(utterance);
  },
  }
})
</script>
