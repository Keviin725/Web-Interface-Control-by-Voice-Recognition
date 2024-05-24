<template>
  <q-page class="bg-dark text-white q-pa-md">
    <div class="text-center">
      <p class="text-h4 q-my-md">Welcome Message</p>

      <!-- Supported Voice Commands -->
      <div class="q-my-md commands-container">
        <p class="text-subtitle2">Supported Voice Commands:</p>
        <q-list dense bordered class="bg-grey-2 text-black">
          <q-item v-for="(command, index) in Object.keys(voiceCommands)" :key="index">
            <q-item-section>{{ command }}</q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- Voice Command Button -->
      <q-btn
        :color="isListening ? 'secondary' : 'primary'"
        round
        icon="mic"
        aria-label="Voice Command"
        @click="initSpeechRecognition"
        class="q-my-md"
      />

      <!-- Recognized Command -->
      <div class="q-my-md">
        <p class="text-subtitle2">Voice Command: {{ voiceCommand }}</p>
      </div>

      <!-- Banner for Voice Command or Error -->
      <q-banner v-if="voiceCommand || errorMessage" class="q-my-md" :type="errorMessage ? 'negative' : 'positive'">
        <b>{{ errorMessage || 'Voice command recognized successfully!' }}</b>
      </q-banner>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { voiceMixin } from '../mixins/voiceMixin'

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
  color: #FF5722; /* Use a prominent color consistent with the landing page buttons */
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
.bg-dark {
  background-color: #1a1a1a;
}

.text-white {
  color: white;
}

.text-black {
  color: black;
}
</style>
