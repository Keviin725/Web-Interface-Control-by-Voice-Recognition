<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Nome do Aplicativo
        </q-toolbar-title>

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

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
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
