<template>
  <q-card v-if="commandResponse" class="command-response">
    <q-card-section class="response-section">
      <div v-if="commandResponse.type === 'weather'" class="weather-response">
        <h3>{{ commandResponse.data.location }}</h3>
        <p>Temperatura: {{ commandResponse.data.temperature }}°C</p>
        <p>Condição: {{ commandResponse.data.condition }}</p>
        <p>Humidade: {{ commandResponse.data.humidity }}%</p>
        <p>Vento: {{ commandResponse.data.windSpeed }} km/h</p>
      </div>
      <div v-else-if="commandResponse.type === 'camera'" class="camera-response">
        <img :src="commandResponse.data" alt="Imagem capturada" class="camera-image" />
      </div>
      <!-- Adicione outras respostas conforme necessário -->
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  props: ['command-executed'],
  data() {
    return {
      commandResponse: null
    };
  },
  watch: {
    commandExecuted(newVal) {
      this.commandResponse = newVal;
    }
  }
};
</script>

<style scoped>
.command-response {
  margin: 1rem 0;
}

.response-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.weather-response {
  text-align: center;
}

.camera-response {
  display: flex;
  justify-content: center;
  align-items: center;
}

.camera-image {
  max-width: 100%;
  max-height: 300px;
  border-radius: 5px;
}
</style>
