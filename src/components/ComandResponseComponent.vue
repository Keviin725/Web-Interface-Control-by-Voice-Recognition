<template>
  <q-card v-if="commandResponse" class="command-response">
    <q-card-section>
      <div v-if="commandResponse.type === 'weather'">
        <p>{{ commandResponse.data }}</p>
      </div>
      <div v-if="commandResponse.type === 'camera'">
        <p>{{ commandResponse.data }}</p>
      </div>
      <!-- Adicione outros tipos de respostas conforme necessário -->
    </q-card-section>
  </q-card>
</template>

<script>
import { useCommandStore } from '../store';

export default {
  setup() {
    const commandStore = useCommandStore();
    return {
      commandResponse: commandStore.commandResponse,
    };
  },
};
</script>

<style scoped>
.command-response {
  margin: 1rem 0;
}
</style>
