<template>
  <Button
    @click="open"
    label="Create new task"
    icon="pi pi-plus" />
  <Dialog
    @update:visible="close()"
    :visible="displayPosition"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
    header="Header"
    position="top">
    <p class="m-0">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <template #footer>
      <Button
        @click="close()"
        label="No"
        icon="pi pi-times"
        class="p-button-text" />
      <Button
        @click="close()"
        label="Yes"
        icon="pi pi-check"
        autofocus />
    </template>
  </Dialog>
</template>

<script setup>
import Button from 'primevue/Button';
import Dialog from 'primevue/Dialog';
import { ref } from 'vue';

const displayPosition = ref(false);

const open = () => { displayPosition.value = true; };
const close = () => { displayPosition.value = false; };
</script>
