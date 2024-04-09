<template>
  <div class="q-pa-md">
    <q-list bordered separator>
      <q-item v-for="chat in chats" :key="chat.id" clickable v-ripple @click="goToChat(chat.id)">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ chat.title[0].toUpperCase() }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ chat.title }}</q-item-label>
          <q-item-label caption lines="1">{{ chat.lastMessage }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="eva-message-circle-outline" color="green" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { api } from '../boot/axios'
import { voiceMixin } from '../mixins/voiceMixin'
export default {
  mixins: [voiceMixin],
  data() {
    return {
      chats: []
    };
  },
  created() {
    this.chats = [
    { id: 1, title: 'Americo Junior', lastMessage: 'Última mensagem de Americo' },
    { id: 2, title: 'Marven Buque', lastMessage: 'Última mensagem de Marven' },
    { id: 3, title: 'Bitch You Playin', lastMessage: 'Última mensagem de byp' },
    { id: 4, title: 'Marven Buque', lastMessage: 'Última mensagem de Marven' },
    { id: 5, title: 'Americo Junior', lastMessage: 'Última mensagem de Americo' },
      // adicione mais chats conforme necessário
    ];
  },
  methods: {
    goToChat(chatId) {
      this.$router.push({ path: `/chat/${chatId}` });
    },
  },
};
</script>
