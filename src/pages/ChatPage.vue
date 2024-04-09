<template>
  <q-page class="flex column">
    <q-banner class="bg-grey-4 text-center">
      User is offline.
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message v-for="message in messages" :key="message.text" :name="message.from" :text="[message.text]"
        :sent="message.from == 'me' ? true : false" />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form @submit.prevent="sendMessage" class="full-width">
    <q-input v-model="voiceCommand" bg-color="white" outlined rounded label="Message" dense>

      <template v-slot:after>
        <q-btn round dense flat type="submit" color="white" icon="send" @click="sendMessage"/>
        <q-btn round dense flat color="white" icon="mic" @click="startSpeechToText"/>
      </template>
    </q-input>
  </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { voiceMixin } from '../mixins/voiceMixin';
export default {
  mixins: [voiceMixin],
  data() {
    return {
      newMessage: '',
      messages: []
    }
  },
  methods: {

  },
}
</script>

<style></style>
