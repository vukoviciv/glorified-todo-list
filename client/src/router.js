import { createRouter, createWebHashHistory } from 'vue-router';

const TodayTasks = () => import('./components/Task/TodayTasks/index.vue');
const WeekTasks = () => import('./components/Task/WeekTasks/index.vue');
const PageNotFound = () => import('../shared/components/PageNotFound.vue');
const AccountCreation = () => import('./components/AccountCreation.vue');

const routes = [{
  path: '/',
  name: 'main',
  redirect: { name: 'today' },
  children: [{
    path: '/today',
    name: 'today',
    component: TodayTasks
  }, {
    path: '/week',
    name: 'week',
    component: WeekTasks
  }]
}, {
  path: '/create-account',
  name: 'create-account',
  component: AccountCreation
}, {
  path: '/:pathMatch(.*)*',
  name: 'not-found',
  component: PageNotFound
}];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
