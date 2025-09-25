const routes = [
  {
    path: '/',
    component: () => import('@/views/login/index.vue'),
    children: []
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    children: []
  },
  {
    path: '/prompt',
    component: () => import('@/views/prompt/index.vue'),
    children: []
  },
  {
    path: '/help',
    component: () => import('@/views/help/index.vue'),
    children: []
  },
];

export default routes;