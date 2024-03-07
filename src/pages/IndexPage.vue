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
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      voiceCommand: '',
      isListening: false,
      errorMessage: '',
      voiceCommands: {},
    }
  },
  created() {
    this.voiceCommands = {
      'navegar para home': this.navigateToHome,
      'abrir menu': this.openMenu,
      'ativar modo escuro': this.toggleDarkMode,
      'ativar': this.toggleDarkMode, // Alias for "ativar modo escuro
      // ... other voice commands ...
    }
  },
  beforeDestroy() {
  if (this.recognition) {
    this.recognition.stop();
  }
},


  methods: {
    toggleDarkMode() {
    this.$q.dark.toggle()
  },
    navigateToHome() {
      this.$router.push('/')
    },
    initSpeechRecognition() {

      if (!('webkitSpeechRecognition' in window)) {
        this.errorMessage = 'Seu navegador não suporta o reconhecimento de voz'
        return
      }

      const recognition = new webkitSpeechRecognition()
      recognition.lang = 'pt-PT'
      recognition.continuous = true
      recognition.interimResults = true

      recognition.onstart = () => {
        this.isListening = true
      }

      recognition.onerror = (event) => {
        this.errorMessage = 'Erro no reconhecimento de voz: ' + event.error
      }

      recognition.onend = () => {
        this.isListening = false
      }

      recognition.onresult = (event) => {
  let interimTranscript = '';
  for (let i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      const transcript = event.results[i][0].transcript;
      const command = this.voiceCommands[transcript];
      if (typeof command === 'function') {
        // Se o valor associado ao comando for uma função, chame-a diretamente
        command();
      } else if (typeof command === 'string') {
        // Se o valor associado ao comando for uma string, é um alias
        // Então, obtenha o método correspondente ao alias
        const methodName = this.voiceCommands[command];
        if (typeof this[methodName] === 'function') {
          this[methodName]();
        }
      }
      recognition.stop();
      break;
    } else {
      interimTranscript += event.results[i][0].transcript;
    }
  }
  if (!this.voiceCommand) {
    this.voiceCommand = interimTranscript;
  }
}


      recognition.start()
    }
  }
})
</script>
