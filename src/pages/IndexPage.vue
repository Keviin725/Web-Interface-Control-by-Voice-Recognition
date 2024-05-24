<template>
  <q-page class="flex flex-center">
    <div class="text-center">
      <p class="text-h4 q-my-md">Mensagem de boas-vindas</p>
      <div class="q-my-md commands-container">
        <p class="text-subtitle2">Comandos de voz suportados:</p>
        <q-list dense bordered>
          <q-item v-for="(command, index) in Object.keys(voiceCommands)" :key="index">
            <q-item-section>{{ command }}</q-item-section>
          </q-item>
        </q-list>
      </div>
      <q-btn :color="isListening ? 'secondary' : 'primary'" round icon="mic" aria-label="Voice Command" @click="initSpeechRecognition" />
      <div class="q-my-md">
        <p class="text-subtitle2">Comando de voz: {{ voiceCommand }}</p>
      </div>

      <q-banner v-if="voiceCommand || errorMessage" class="q-my-md" :type="errorMessage ? 'negative' : 'positive'">
        <b>{{ errorMessage || 'Comando de voz reconhecido com sucesso!' }}</b>
      </q-banner>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import {voiceMixin} from '../mixins/voiceMixin'

export default defineComponent({
  name: 'IndexPage',
  mixins: [voiceMixin],
})
</script>

<style scoped>
.text-center {
  max-width: 600px;
  margin: 0 auto;
}

.text-h4 {
  color: #3f51b5;
}

.q-btn {
  margin-top: 20px;
}

.q-banner {
  margin-top: 20px;
}

.commands-container {
  height: 200px;
  overflow-y: auto;
}
</style>
