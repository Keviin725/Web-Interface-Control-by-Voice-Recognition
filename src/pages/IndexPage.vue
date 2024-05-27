<template>
  <q-page class="flex flex-center bg-dark text-white">
    <div class="text-center animated fadeIn">
      <!-- Banner Section -->
      <div class="banner-section">
        <q-img src="/image-2.png" class="banner-img" />
      </div>
      <h2 class="text-h4 q-my-md">QuasarVoice</h2>

      <!-- Stats Section -->
      <div class="stats-section q-mb-lg">
        <div class="row q-col-gutter-lg">
          <div class="col-4">
            <div class="stat-item">
              <h3 class="text-h5">10</h3>
              <p>Commands</p>
            </div>
          </div>
          <div class="col-4">
            <div class="stat-item">
              <h3 class="text-h5">3</h3>
              <p>Menus</p>
            </div>
          </div>
          <div class="col-4">
            <div class="stat-item">
              <h3 class="text-h5">5</h3>
              <p>Settings</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons q-mb-lg">
        <q-btn
          :label="isListening ? 'Stop' : 'Speak'"
          @click="initSpeechRecognition"
          :color="isListening ? 'red' : 'warning'"
          class="q-mr-md full-width rounded-button animated-button"
          icon="mic"
        />
        <q-btn
          to="/commands"
          label="Customize"
          color="white"
          text-color="black"
          class="full-width rounded-button animated-button"
          icon="settings"
        />
      </div>

      <!-- Command Section -->
      <div class="command-section q-mb-lg">
        <h3 class="text-h6">Commands</h3>
        <q-list bordered class="commands-list">
          <q-item v-for="(command, index) in commands" :key="index" clickable class="hover-shadow">
            <q-item-section>
              <q-item-label>{{ command }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- Command Dialog -->
      <q-dialog position="bottom" v-model="isDialogVisible">
        <q-card>
          <q-card-section>
            <div class="text-h6">Recognized Command</div>
          </q-card-section>
          <q-card-section>
            <p>{{ recognizedCommand }}</p>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { voiceMixin } from 'src/mixins/voiceMixin';
export default {
  mixins: [voiceMixin],
  name: 'ProfilePage',
  data() {
    return {
      isDialogVisible: false,
      recognizedCommand: '',
      commands: [
        'previsão do tempo',
        'Send message',
        'Hands-free Navigation',
        'Play favorite playlist'
      ]
    };
  },
  methods: {
    initSpeechRecognition() {
      this.isListening = !this.isListening;

      if (this.isListening) {
        // Simulating speech recognition process
        setTimeout(() => {
          this.recognizedCommand = 'Open WhatsApp';
          this.isDialogVisible = true;
          this.isListening = false;

          // Hide the dialog after 3 seconds
          setTimeout(() => {
            this.isDialogVisible = false;
          }, 3000);
        }, 3000);
      }
    }
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animated {
  animation: fadeIn 1s ease-in;
}

.bg-dark {
  background-color: #1a1a1a;
}

.text-white {
  color: white;
}

.text-center {
  text-align: center;
}

.full-width {
  width: 100%;
}

.rounded-borders {
  border-radius: 10px;
}

.profile-section img {
  border-radius: 50%;
}

.stat-item {
  text-align: center;
}

.action-buttons .q-btn {
  margin-top: 20px;
}

.rounded-button {
  border-radius: 25px;
  transition: transform 0.2s;
}

.rounded-button:hover {
  transform: scale(1.05);
}

.commands-list .q-item {
  transition: box-shadow 0.3s;
}

.commands-list .q-item:hover {
  box-shadow: 0 4px 8px #f54814
}

.footer-content {
  padding: 20px;
}

/* Banner styles */
.banner-section {
  position: relative;
  width: 100%;
  height: 200px;
}

.banner-img {
  width: 100%;
  height: 100%;
}

/* Profile avatar adjustment */
.profile-avatar {
  position: absolute;
  top: -50px; /* Adjust this value to position the avatar */
  left: 50%;
  transform: translateX(-50%);
}
</style>
