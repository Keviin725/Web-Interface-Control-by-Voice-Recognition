const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/landing.vue') },
      { path: '/home', component: () => import('pages/IndexPage.vue') },
      { path: '/about', component: () => import('pages/about.vue') },
      { path: '/help', component: () => import('pages/help.vue') },
      { path: '/settings', component: () => import('pages/settings.vue') },
      { path: '/chat/:id', component: () => import('pages/ChatPage.vue') },
      { path: '/chatlist', component: () => import('pages/ChatListPage.vue') },
      { path: '/commands', component: () => import('pages/CustomCommands.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
