<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-dark">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          v-if="!$route.path.includes('landing')"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>QuasarVoice</q-toolbar-title>
        <q-btn flat icon="mic" @click="startVoiceCommand" />

        <div v-if="isListening">
          <q-spinner color="primary" size="1em" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above>
  <q-list>
    <q-item clickable v-ripple to="/home" active-class="bg-primary">
      <q-item-section avatar>
        <q-icon name="home" />
      </q-item-section>
      <q-item-section>
        Inicio
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/chatlist" active-class="bg-primary">
      <q-item-section avatar>
        <q-icon name="chat" />
      </q-item-section>
      <q-item-section>
        Chat
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/settings" active-class="bg-primary">
      <q-item-section avatar>
        <q-icon name="settings" />
      </q-item-section>
      <q-item-section>
        Configurações
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple to="/help" active-class="bg-primary">
      <q-item-section avatar>
        <q-icon name="help" />
      </q-item-section>
      <q-item-section>
        Ajuda
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple to="/about" active-class="bg-primary">
      <q-item-section avatar>
        <q-icon name="info" />
      </q-item-section>
      <q-item-section>
        Sobre
      </q-item-section>
    </q-item>
  </q-list>
</q-drawer>
   <!-- Footer Section -->
   <q-footer class="bg-dark text-white">
          <q-toolbar>
            
            <div>
              <q-btn flat icon="fab fa-facebook" />
              <q-btn flat icon="fab fa-twitter" />
              <q-btn flat icon="fab fa-linkedin" />
            </div>
          </q-toolbar>
          <div class="q-pa-md text-center">
            <p>© 2024 QuasarVoice. All rights reserved.</p>
            <p>
              <a href="#!" class="text-white">Privacy Policy</a> |
              <a href="#!" class="text-white">Terms of Use</a>
            </p>
          </div>
        </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { route } from 'quasar/wrappers';
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
