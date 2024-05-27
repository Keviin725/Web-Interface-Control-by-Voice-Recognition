<template>
  <q-page class="flex flex-center bg-dark text-white">
    <div class="text-center animated fadeIn">
      <h2 class="text-h4 q-my-md">Customize Commands</h2>

      <!-- Commands List Section -->
      <div class="commands-list-section q-mb-lg">
        <q-list bordered class="commands-list">
          <q-item v-for="(command, index) in commands" :key="index" clickable class="hover-shadow">
            <q-item-section>
              <q-item-label>{{ command }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn icon="edit" @click="editCommand(index)" />
              <q-btn icon="delete" color="negative" @click="deleteCommand(index)" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- Add Command Button -->
      <div class="add-command q-mb-lg">
        <q-btn label="Add Command" color="warning" class="full-width rounded-button animated-button" @click="openAddCommandDialog" />
      </div>

      <!-- Add/Edit Command Dialog -->
      <q-dialog v-model="isDialogVisible">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ dialogTitle }}</div>
          </q-card-section>
          <q-card-section>
            <q-input v-model="commandInput" label="Command" outlined />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Save" color="primary" @click="saveCommand" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { voiceMixin } from 'src/mixins/voiceMixin';
export default {
  mixins: [voiceMixin],
  name: 'CustomizeCommandsPage',
  data() {
    return {
      isDialogVisible: false,
      dialogTitle: 'Add Command',
      commandInput: '',
      editingIndex: null,
      commands: [
        'previsão do tempo',
        'Send message',
        'Hands-free Navigation',
        'Play favorite playlist'
      ]
    };
  },
  methods: {
    openAddCommandDialog() {
      this.dialogTitle = 'Add Command';
      this.commandInput = '';
      this.editingIndex = null;
      this.isDialogVisible = true;
    },
    editCommand(index) {
      this.dialogTitle = 'Edit Command';
      this.commandInput = this.commands[index];
      this.editingIndex = index;
      this.isDialogVisible = true;
    },
    saveCommand() {
      if (this.editingIndex === null) {
        this.commands.push(this.commandInput);
      } else {
        this.commands.splice(this.editingIndex, 1, this.commandInput);
      }
      this.isDialogVisible = false;
    },
    deleteCommand(index) {
      this.commands.splice(index, 1);
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

.commands-list .q-item {
  transition: box-shadow 0.3s;
}

.commands-list .q-item:hover {
  box-shadow: 0 4px 8px #f54814;
}

.add-command .q-btn {
  margin-top: 20px;
}

.rounded-button {
  border-radius: 25px;
  transition: transform 0.2s;
}

.rounded-button:hover {
  transform: scale(1.05);
}
</style>
