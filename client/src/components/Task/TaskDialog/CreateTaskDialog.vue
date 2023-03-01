<template>
  <TaskDialog
    @close="close"
    @action:emit="createTask"
    action-type="create"
    :show-dialog="showDialog"
    :initial-task="task">
    <template #activator>
      <Button
        @click="open"
        label="Create new task"
        :icon="PrimeIcons.PLUS" />
    </template>
  </TaskDialog>
</template>

<script setup>
import Button from 'primevue/Button';
import { PrimeIcons } from 'primevue/api';
import { ref } from 'vue';
import TaskDialog from './common/TaskDialog.vue';
import { useSnackbar } from '../../composables/snackbar';
import { useStore } from 'vuex';

const DEFAULT_ERROR_MSG = 'Something went wrong';
const showDialog = ref(false);
const store = useStore();
const task = ref({ name: '' });
const { showSnackbar } = useSnackbar();

const close = () => {
  showDialog.value = false;
};
const open = () => { showDialog.value = true; };
const createTask = task => {
  store.dispatch('createTask', task)
    .then(() => {
      showSnackbar('Task created!', 'success');
    }).catch(error => {
      const text = error.response.data || DEFAULT_ERROR_MSG;
      showSnackbar(text, 'error');
    }).finally(() => close());
};
</script>
