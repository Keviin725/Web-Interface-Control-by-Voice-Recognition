<template>
  <q-page class="bg-dark text-white q-pa-md">


    <q-page-container>
      <q-page class="q-pa-md text-center">
        <div class="q-mb-md">
          <img src="path/to/voice-command-icon.png" alt="Voice Command" class="q-mb-md" style="width: 100px; height: 100px;" />
          <p class="text-h5 q-mb-md">Voice Command</p>
        </div>

        <div class="command-buttons q-mb-lg">
          <q-row gutter-lg>
            <q-col cols="12" sm="6" md="6">
              <q-btn label="Enable" color="warning" class="command-button q-mb-md full-width" />
            </q-col>
            <q-col cols="12" sm="6" md="6">
              <q-btn label="Add custom Command" color="warning" class="command-button q-mb-md full-width" />
            </q-col>

            <q-col cols="12" sm="6" md="6">
              <q-btn label="Automate Tasks" color="warning" class="command-button q-mb-md full-width" />
            </q-col>
            <q-col cols="12" sm="6" md="6">
              <q-btn label="Support" color="warning" class="command-button q-mb-md full-width" />
            </q-col>
          </q-row>
        </div>
      </q-page>
    </q-page-container>
  </q-page>
</template>

<script>
import { defineComponent, computed, watch } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'SettingsPage',
  data() {
    return {
      currentLanguage: navigator.language || 'pt-PT',
      languageOptions: [
        { label: 'Português', value: 'pt-PT' },
        { label: 'Inglês', value: 'en-US' },
      ],
      sensitivity: 50
    }
  },
  setup() {
    const $q = useQuasar()
    const darkMode = computed({
      get: () => $q.dark.isActive,
      set: (value) => $q.dark.set(value)
    })

    watch(() => $q.dark.isActive, val => {
      console.log(val ? 'On dark mode' : 'On light mode')
    })

    return {
      darkMode
    }
  },
  methods: {
    toggleDarkMode(value) {
      this.$q.dark.set(value)
    },
    changeLanguage() {
      this.initSpeechRecognition();
    },
  }
})
</script>


<style scoped>
.bg-dark {
  background-color: #1a1a1a;
}

.text-white {
  color: white;
}

.text-center {
  text-align: center;
}

.command-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.command-button {
  width: 200px;
}

.footer-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.footer-links q-btn {
  margin: 0 10px;
}

.social-icons q-btn {
  margin: 0 5px;
}
</style>
