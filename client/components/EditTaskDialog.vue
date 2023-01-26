<template>
  <TaskDialog
    @close="close"
    @action:emit="updateTask"
    action-type="update"
    :task="task"
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
import Button from 'primevue/Button';
import { PrimeIcons } from 'primevue/api';
import { ref } from 'vue';
import taskApi from '@/src/api/tasks';
import TaskDialog from './common/TaskDialog.vue';

defineProps({
  task: { type: Object, required: true }
});
const showDialog = ref(false);

const close = () => { showDialog.value = false; };
const open = () => { showDialog.value = true; };
const updateTask = async task => {
  taskApi.update(task).then(() => {
    close();
  });
};
</script>
