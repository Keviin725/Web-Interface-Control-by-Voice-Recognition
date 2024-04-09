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
import {voiceMixin} from '../mixins/voiceMixin'

export default defineComponent({
  name: 'IndexPage',
  mixins: [voiceMixin],
})
</script>
