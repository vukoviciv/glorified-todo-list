<template>
  <div class="create-wrapper flex justify-content-end">
    <Button
      @click="open"
      label="Create new task"
      icon="pi pi-plus" />
  </div>
  <Dialog
    @update:visible="close()"
    :visible="displayPosition"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
    header="Header"
    position="top">
    <p class="m-0">
      {{ task }}
    </p>
    <template #footer>
      <Button
        @click="close()"
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text" />
      <Button
        @click="create()"
        label="Create task"
        icon="pi pi-check"
        autofocus />
    </template>
  </Dialog>
</template>

<script setup>
import Button from 'primevue/Button';
import Dialog from 'primevue/Dialog';
import { ref } from 'vue';
import taskApi from '@/src/api/tasks';

const displayPosition = ref(false);
const task = {
  name: 'Test task from the modal',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
  done: false,
  priority: 'HIGH'
};

const open = () => { displayPosition.value = true; };
const close = () => { displayPosition.value = false; };
const create = () => {
  taskApi.create(task).then(data => {
    console.log({ data });
  });
};
</script>
