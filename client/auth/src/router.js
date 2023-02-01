import { createRouter, createWebHistory } from 'vue-router';

const AppLogin = () => import('./components/AppLogin.vue');

const routes = [{
  path: '/auth',
  name: 'main',
  component: AppLogin
}];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
