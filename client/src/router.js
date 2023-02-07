import { createRouter, createWebHashHistory } from 'vue-router';

const MainPage = () => import('./components/MainPage.vue');
const TodayTasks = () => import('./components/Task/TodayTasks/index.vue');
const WeekTasks = () => import('./components/Task/WeekTasks/index.vue');

const routes = [{
  path: '/',
  name: 'main',
  component: MainPage,
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
}];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
