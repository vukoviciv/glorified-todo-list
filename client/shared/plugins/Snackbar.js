import TodoSnackbar from '../components/TodoSnackbar.vue';

export default {
  install: (app, options = {}) => {
    // eslint-disable-next-line vue/component-definition-name-casing
    app.component('TodoSnackbar', TodoSnackbar);
  }
};
