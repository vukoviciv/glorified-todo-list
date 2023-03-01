<template>
  <TaskDialog
    @close="close"
    @action:emit="updateTask"
    action-type="update"
    :initial-task="task"
    :show-dialog="showDialog">
    <template #activator>
      <Button
        @click="open"
        :icon="PrimeIcons.PENCIL"
        class="p-button-rounded p-button-outlined ml-3"
        title="Edit task"
        aria-label="Edit task" />
    </template>
  </TaskDialog>
</template>

<script setup>
import { inject, ref } from 'vue';
import Button from 'primevue/Button';
import isEqual from 'lodash/isEqual';
import { PrimeIcons } from 'primevue/api';
import { snackbarConfig } from '../../../../config/snackbar';
import TaskDialog from './common/TaskDialog.vue';
import { useStore } from 'vuex';

const DEFAULT_ERROR_MSG = 'Something went wrong';
const props = defineProps({
  task: { type: Object, required: true }
});
const showDialog = ref(false);
let snackbar = inject('snackbar');
const store = useStore();

const showSnackbar = (text, type) => {
  const config = {
    ...snackbarConfig[type],
    text,
    isActive: true
  };
  snackbar = Object.assign(snackbar, config);
};
const close = () => { showDialog.value = false; };
const open = () => { showDialog.value = true; };
const updateTask = task => {
  if (isEqual(task, props.task)) {
    close();
    return;
  }
  store.dispatch('updateTask', task)
    .then(() => showSnackbar('Task edited!', 'success'))
    .catch(error => { // TODO: test if this is working
      const text = error.response.data || DEFAULT_ERROR_MSG;
      showSnackbar(text, 'error');
    }).finally(() => close());
};
</script>
