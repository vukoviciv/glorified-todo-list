import { defineAsyncComponent, reactive } from 'vue';
import { snackbarConfig } from '../../config/snackbar';

const TodoSnackbar = () => import('../components/TodoSnackbar.vue');

export default {
  install: app => {
    app.component(
      'todo-snackbar',
      defineAsyncComponent(TodoSnackbar)
    );
    const snackbar = reactive({
      text: '',
      isActive: false,
      ...snackbarConfig.info
    });
    app.provide('snackbar', snackbar);
  }
};
