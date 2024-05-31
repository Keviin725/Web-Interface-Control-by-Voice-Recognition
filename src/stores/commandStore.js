import { defineStore } from "pinia";

export const useCommandStore = defineStore('command',{

  state: () => ({
    commandResponse: null,
    errorMessage: '',
    voiceCommand: '',
  }),

  actions: {
    setCommandResponse(response) {
      this.commandResponse = response;
    },
    setErrorMessage(message) {
      this.errorMessage = message;
    },
    setVoiceCommand(command) {
      this.voiceCommand = command;
    },
  }
})
