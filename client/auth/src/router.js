import { createRouter, createWebHashHistory } from 'vue-router';

const AppLogin = () => import('./components/AppLogin.vue');
const AppLogout = () => import('./components/AppLogout.vue');
const AppRegister = () => import('./components/AppRegister.vue');

const routes = [{
  path: '/',
  name: 'home',
  redirect: { name: 'login' }
}, {
  path: '/login',
  name: 'login',
  component: AppLogin
}, {
  path: '/logout',
  name: 'logout',
  component: AppLogout
}, {
  path: '/register',
  name: 'register',
  component: AppRegister
}
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
