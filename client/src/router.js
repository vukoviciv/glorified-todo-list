import { createRouter, createWebHistory } from 'vue-router';

const MainPage = () => import('./components/MainPage.vue');
const TasksMain = () => import('./components/Task/TasksMain.vue');

const routes = [{
  path: '/',
  name: 'main',
  component: MainPage,
  children: [{
    path: '',
    name: 'tasks-main',
    component: TasksMain
  }]
}];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
