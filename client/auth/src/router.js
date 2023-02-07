import { createRouter, createWebHistory } from 'vue-router';

const AppLogin = () => import('./components/AppLogin.vue');

const routes = [{
  path: '/',
  name: 'home',
  redirect: { name: 'login' }
}, {
  path: '/auth/login',
  name: 'login',
  redirect: AppLogin
}];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
