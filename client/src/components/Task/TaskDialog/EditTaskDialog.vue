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
import Button from 'primevue/Button';
import isEqual from 'lodash/isEqual';
import { PrimeIcons } from 'primevue/api';
import { ref } from 'vue';
import taskApi from '@/src/api/tasks';
import TaskDialog from './common/TaskDialog.vue';

const props = defineProps({
  task: { type: Object, required: true }
});
const showDialog = ref(false);
const emit = defineEmits(['task:edit']);
const close = () => { showDialog.value = false; };
const open = () => { showDialog.value = true; };
const updateTask = async task => {
  if (isEqual(task, props.task)) {
    close();
    return;
  }
  await taskApi.update(task).then(task => {
    emit('task:edit', task);
  });
  close();
};
</script>
