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
              <q-btn label="Enable" color="primary" class="command-button q-mb-md full-width" />
            </q-col>
            <q-col cols="12" sm="6" md="6">
              <q-btn label="Edit" color="primary" class="command-button q-mb-md full-width" />
            </q-col>
            <q-col cols="12" sm="6" md="6">
              <q-btn label="Set Message" color="primary" class="command-button q-mb-md full-width" />
            </q-col>
            <q-col cols="12" sm="6" md="6">
              <q-btn label="Set Reminders" color="primary" class="command-button q-mb-md full-width" />
            </q-col>
            <q-col cols="12" sm="6" md="6">
              <q-btn label="Automate Tasks" color="primary" class="command-button q-mb-md full-width" />
            </q-col>
            <q-col cols="12" sm="6" md="6">
              <q-btn label="Support" color="primary" class="command-button q-mb-md full-width" />
            </q-col>
          </q-row>
        </div>
      </q-page>
    </q-page-container>
  </q-page>
</template>

<script>
export default {
  name: 'SettingsPage'
}
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
