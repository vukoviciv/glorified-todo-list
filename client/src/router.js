import { createRouter, createWebHistory } from 'vue-router';

const MainPage = () => import('./components/MainPage.vue');
const TodayTasks = () => import('./components/Task/TodayTasks/index.vue');
const WeekTasks = () => import('./components/Task/WeekTasks/index.vue');

const routes = [{
  path: '/',
  name: 'main',
  component: MainPage,
  children: [{
    path: '/today',
    name: 'today-tasks',
    component: TodayTasks
  }, {
    path: '/week',
    name: 'week-tasks',
    component: WeekTasks
  }]
}];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
