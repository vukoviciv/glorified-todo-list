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
import Button from 'primevue/Button';
import { PrimeIcons } from 'primevue/api';
import { ref } from 'vue';
import taskApi from '@/src/api/tasks';
import TaskDialog from './common/TaskDialog.vue';

const emit = defineEmits(['task:created']);
const showDialog = ref(false);

const close = () => { showDialog.value = false; };
const open = () => { showDialog.value = true; };
const createTask = async task => {
  await taskApi.create(task).then(() => {
    emit('task:created');
  });
  close();
};
</script>
