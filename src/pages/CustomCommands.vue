<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h6">Adicionar Novo Comando de Voz</div>
    </q-card-section>
    <q-card-section>
      <q-form>
        <q-input
          filled
          v-model="newVoiceCommand"
          label="Comando de voz"
          prepend-icon="mic"
          class="q-mb-md"
        />
        <q-input
          filled
          v-model="newVoiceAction"
          label="Ação"
          prepend-icon="build"
          class="q-mb-md"
        />
        <q-btn
          label="Adicionar comando"
          type="submit"
          color="primary"
          class="full-width"
          @click="addCustomVoiceCommand()"
        />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      newVoiceCommand: '',
      newVoiceAction: '',
    };
  },
  methods: {
    addCustomVoiceCommand() {
      // Adicione o novo comando de voz ao objeto userVoiceCommands do componente pai
      this.$emit('add-command', { command: this.newVoiceCommand, action: this.newVoiceAction });
      // Limpe os campos de entrada
      console.log('ligado')
      this.newVoiceCommand = '';
      this.newVoiceAction = '';
    },
  },
};
</script>

<style>
.full-width {
  width: 100%;
}
</style>
