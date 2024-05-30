import { createRouter, createWebHistory } from 'vue-router';

var hasMicrophonePermission = false;
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/landing.vue'), name: 'landing' },
      { path: '/home', component: () => import('pages/IndexPage.vue'), name: 'home' },
      { path: '/about', component: () => import('pages/about.vue'), name: 'about' },
      { path: '/help', component: () => import('pages/help.vue'), name: 'help' },
      { path: '/settings', component: () => import('pages/settings.vue'), name: 'settings' },
      { path: '/chat/:id', component: () => import('pages/ChatPage.vue'), name: 'chat' },
      { path: '/chatlist', component: () => import('pages/ChatListPage.vue'), name: 'chatlist' },
      { path: '/commands', component: () => import('pages/CustomCommands.vue'), name: 'commands' },
    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Adiciona um guarda de navegação global antes de cada rota
router.beforeEach((to, from, next) => {
  if (to.path === '/' && hasMicrophonePermission) {
    router.push('/home');
  } else {
    next();
  }
});

// Quando o usuário dá permissão para o microfone, atualiza a variável


export default routes
