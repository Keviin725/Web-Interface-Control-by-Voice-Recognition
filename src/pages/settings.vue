<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="text-h6">Configurações</div>
      </q-card-section>

      <q-card-section>
        <q-toggle
          v-model="darkMode"
          label="Modo escuro"
          color="primary"
          @input="toggleDarkMode"
        />
        <q-select
          v-model="language"
          :options="languageOptions"
          label="Idioma"
          color="primary"
        />
        <q-slider
          v-model="sensitivity"
          min="0"
          max="100"
          label="Sensibilidade do reconhecimento de voz"
          color="primary"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, computed, watch } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'SettingsPage',
  data() {
    return {
      language: 'English',
      languageOptions: ['English', 'Spanish', 'French', 'German', 'Italian'],
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
    }
  }
})
</script>
