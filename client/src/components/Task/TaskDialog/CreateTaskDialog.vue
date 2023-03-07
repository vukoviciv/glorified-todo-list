<template>
  <TaskDialog
    @close="close"
    @action:emit="createTask"
    action-type="create"
    :show-dialog="showDialog"
    :activator-id="activatorId"
    :initial-task="task">
    <template #activator>
      <Button
        @click="open"
        :id="activatorId"
        :icon="PrimeIcons.PLUS"
        label="Create new task"
        class="w-full p-button-outlined" />
    </template>
  </TaskDialog>
</template>

<script setup>
import Button from 'primevue/Button';
import { PrimeIcons } from 'primevue/api';
import { ref } from 'vue';
import TaskDialog from './common/TaskDialogForm.vue';
import { types } from '@/config/snackbar.js';
import { useSnackbar } from '../../composables/snackbar';
import { useStore } from 'vuex';

const DEFAULT_ERROR_MSG = 'Something went wrong';
const showDialog = ref(false);
const store = useStore();
const task = ref({});
const { showSnackbar } = useSnackbar();
const activatorId = 'create-task-activator';

const close = () => { showDialog.value = false; };
const open = () => {
  showDialog.value = true;
  task.value = {};
};
const createTask = task => {
  store.dispatch('createTask', task)
    .then(() => {
      showSnackbar(`Task ${task.name} created!`, types.SUCCESS);
    }).catch(error => {
      const text = error.response.data || DEFAULT_ERROR_MSG;
      showSnackbar(text, types.ERROR);
    }).finally(() => close());
};
</script>
