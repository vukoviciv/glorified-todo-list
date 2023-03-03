import { defineAsyncComponent, reactive } from 'vue';
import { snackbarConfig } from '../../config/snackbar';

const TodoSnackbar = () => import('../components/TodoSnackbar.vue');

const DEFAULT_ACTIVE_TIME = 5000;

export default {
  install: app => {
    app.component(
      'todo-snackbar',
      defineAsyncComponent(TodoSnackbar)
    );
    const snackbar = reactive({
      isActive: false,
      time: DEFAULT_ACTIVE_TIME,
      ...snackbarConfig.info
    });
    app.provide('snackbar', snackbar);
  }
};
