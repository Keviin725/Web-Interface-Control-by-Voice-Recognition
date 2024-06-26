import { defineComponent } from "vue"; // Import the defineComponent function from Vue

import { useCommandStore } from "src/stores/commandStore";

// Define a Vue component using defineComponent
export const voiceMixin = defineComponent({
  // Component data properties
  data() {
    return {
      voiceCommand: "", // Store the current voice command
      isListening: false, // Flag to indicate if speech recognition is active
      errorMessage: "", // Store error messages
      voiceCommands: {}, // Store the available voice commands
      recognition: null, // Speech recognition instance
      userVoiceCommands: {}, // Store user-defined voice commands
      isDialogVisible: false, // Flag to show/hide dialog
      dialogCommand: "", // Store the command for dialog display
    };
  },
  // Lifecycle hook called when the component is created
  created() {
    const commandStore = useCommandStore();
    this.voiceCommands = commandStore.commands;
    commandStore.setVoiceCommands(this.initVoiceCommands()); // Initialize voice commands
    console.log("Voice commands initialized:", this.voiceCommands); // Log the initialized commands
    this.onRecognitionResult = this.onRecognitionResult.bind(this); // Bind the method to the Vue context
  },
  // Lifecycle hook called before the component is destroyed
  beforeDestroy() {
    if (this.recognition) {
      // Check if recognition is active
      this.recognition.stop(); // Stop speech recognition
    }
  },
  methods: {
    // Initialize voice commands from the imported commands module
    initVoiceCommands() {
      const commandStore = useCommandStore();
      const commands = commandStore.commands; // Fetch commands from the store

      this.voiceCommands = commands.reduce((acc, command) => {
        acc[command.name.toLowerCase()] = command.execute; // Map command names to their execute functions
        return acc;
      }, {});
    },
    // Toggle speech recognition on/off
    toggleSpeechRecognition() {
      this.isListening = !this.isListening; // Toggle the listening flag
      if (this.isListening) {
        this.initSpeechRecognition(); // Start speech recognition
      } else {
        this.stopSpeechRecognition(); // Stop speech recognition
      }
    },
    // Add a custom voice command
    addCustomVoiceCommand(command, action) {
      this.userVoiceCommands[command] = action; // Add the custom command to userVoiceCommands
    },
    // Initialize speech recognition
    initSpeechRecognition() {
      if (!("webkitSpeechRecognition" in window)) {
        // Check if the browser supports speech recognition
        this.errorMessage = "Seu navegador não suporta o reconhecimento de voz"; // Set error message
        return;
      }

      // Include user's custom voice commands when initializing voice commands
      this.voiceCommands = { ...this.voiceCommands };

      this.recognition = new webkitSpeechRecognition(); // Create a new speech recognition instance
      this.recognition.lang = "pt-PT"; // Set the recognition language
      this.recognition.continuous = true; // Enable continuous recognition
      this.recognition.interimResults = true; // Enable interim results

      this.recognition.onstart = this.onRecognitionStart; // Set the onstart event handler
      this.recognition.onerror = this.onRecognitionError; // Set the onerror event handler
      this.recognition.onend = this.onRecognitionEnd; // Set the onend event handler
      this.recognition.onresult = this.onRecognitionResult; // Set the onresult event handler

      this.recognition.start(); // Start speech recognition
    },
    // Handler for when recognition starts
    onRecognitionStart() {
      console.log("Recognition started"); // Log recognition start
      this.isListening = true; // Set the listening flag to true
    },
    // Handler for recognition errors
    onRecognitionError(event) {
      console.log("Recognition error:", event.error); // Log the error
      this.errorMessage = "Erro no reconhecimento de voz: " + event.error; // Set the error message
    },
    // Stop speech recognition
    stopSpeechRecognition() {
      this.recognition.stop(); // Stop the recognition instance
    },
    // Handler for when recognition ends
    onRecognitionEnd() {
      console.log("Recognition ended"); // Log recognition end
      this.isListening = false; // Set the listening flag to false
    },
    // Speak the given text using speech synthesis
    speak(text) {
      const utterance = new SpeechSynthesisUtterance(text); // Create a new speech synthesis utterance
      utterance.lang = "pt-PT"; // Set the language for the utterance
      window.speechSynthesis.speak(utterance); // Speak the utterance
    },
    // Handler for recognition results
    onRecognitionResult(event) {
      let interimTranscript = ""; // Initialize an empty interim transcript
      for (let i = event.resultIndex; i < event.results.length; i++) {
        // Loop through the results
        if (event.results[i].isFinal) {
          // Check if the result is final
          const transcript = event.results[i][0].transcript
            .trim()
            .toLowerCase(); // Get the final transcript
          this.executeCommand(transcript); // Execute the command
          this.dialogCommand = transcript; // Set the dialog command
          this.isDialogVisible = true; // Show the dialog
          setTimeout(() => {
            this.isDialogVisible = false; // Hide the dialog after 5 seconds
          }, 5000);
        } else {
          interimTranscript += event.results[i][0].transcript; // Append interim results
        }
      }
      this.voiceCommand = interimTranscript; // Set the voice command to the interim transcript
    },
    // Execute the command based on the transcript
    async executeCommand(transcript) {
      let original = transcript;
      console.log("Original Transcript:", transcript); // Log original transcript
      transcript = transcript.replace(/\.$/, ""); // Remove the trailing dot from the transcript
      console.log("Transcript after removing trailing dot:", transcript); // Log transcript after removing trailing dot

      const commandKey = Object.keys(this.voiceCommands).find((key) =>
        transcript.includes(key)
      );
      const commandFunction = this.voiceCommands[commandKey];

      if (typeof commandFunction === "function") {
        console.log("Executing command:", commandKey);
        let params;
        console.log("Transcript:", transcript);
        console.log("Transcript Original:", original);
        // Lista estática de contatos
        const contacts = [
          { name: "américco", number: "868384809" },
          { name: "marven", number: "844840789" },
          { name: "kevin", number: "847258725" },
        ];

        if (commandKey === "enviar mensagem para") {
          const match = transcript.match(
            /enviar mensagem para (.*?) com a mensagem (.*)/
          );
          if (match) {
            const contactName = match[1];
            const message = match[2];
            const contact = contacts.find(
              (contact) => contact.name === contactName
            );
            if (contact) {
              params = [contact.number, message];
              console.log("Matched params:", params);
            } else {
              console.log(`Contato ${contactName} não encontrado.`);
            }
          }
        } else if (commandKey === "ligar para") {
          const match = transcript.match(/ligar para (.*)/);
          if (match) {
            const contactName = match[1];
            const contact = contacts.find(
              (contact) => contact.name === contactName
            );
            if (contact) {
              params = [contact.number];
              console.log("Matched params:", params);
            } else {
              console.log(`Contato ${contactName} não encontrado.`);
            }
          }
        } else if (commandKey === "reproduzir vídeo no youtube sobre") {
          const match = transcript.match(
            /reproduzir vídeo no youtube sobre (.*)/
          );
          if (match) {
            params = [match[1]];
            console.log("Matched params:", params);
          }
        } else if (commandKey === "enviar e-mail") {
          const match = transcript.match(
            /enviar e-mail para (.*?) com o assunto (.*)/
          );
          if (match) {
            params = [match[1], match[2]];
            console.log("Matched params:", params);
          }
        } else if (commandKey === "navegar para") {
          const match = transcript.match(/navegar para (.*)/);
          if (match) {
            let routeName = match[1].trim().replace(/\.$/, "");
            console.log("Matched route:", routeName);
            this.$router.push({ path: routeName });
            return;
          }
        } else {
          params = transcript.replace(commandKey, "").trim().split(" ");
        }

        // Remove trailing dots from params
        params = params.map((param) => param.replace(/\.$/, ""));
        console.log("Params after removing trailing dots:", params); // Log params after removing trailing dots

        console.log("Function:", commandFunction, "Params:", params);
        const result = await commandFunction.apply(this, params);

        if (result) {
          this.speak(result);
        } else {
          this.speak(`Comando ${commandKey} executado com sucesso.`);
        }
        this.recognition.stop();
      } else {
        this.speak(`Comando ${transcript} não encontrado.`);
      }
    },
  },
});
