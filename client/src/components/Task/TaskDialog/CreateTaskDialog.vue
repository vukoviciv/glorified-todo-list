<template>
  <TaskDialog
    @close="close"
    @action:emit="createTask"
    action-type="create"
    :show-dialog="showDialog">
    <template #activator>
      <Button
        @click="open"
        label="Create new task"
        :icon="PrimeIcons.PLUS" />
    </template>
  </TaskDialog>
</template>

<script setup>
import { inject, ref } from 'vue';
import Button from 'primevue/Button';
import { PrimeIcons } from 'primevue/api';
import { snackbarConfig } from '../../../../config/snackbar';
import TaskDialog from './common/TaskDialog.vue';
import { useStore } from 'vuex';

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
const createTask = task => {
  store.dispatch('createTask', task)
    .then(() => {
      showSnackbar('Task created!', 'success');
    }).catch(error => {
      const text = error.response.data;
      showSnackbar(text, 'error');
    }).finally(() => close());
};
</script>
