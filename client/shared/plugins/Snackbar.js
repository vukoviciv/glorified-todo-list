import { defineAsyncComponent, reactive } from 'vue';

const TodoSnackbar = () => import('../components/TodoSnackbar.vue');

export default {
  install: app => {
    app.component(
      'todo-snackbar',
      defineAsyncComponent(TodoSnackbar)
    );
    const snackbar = reactive({
      title: 'Default title',
      text: '',
      isActive: true
    });
    app.provide('snackbar', snackbar);
  }
};
