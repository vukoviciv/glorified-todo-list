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
    header="Create new task"
    position="top">
    <div class="m-0 p-3">
      <div class="p-float-label flex">
        <InputText
          v-model="task.name"
          id="name"
          type="text"
          required="required"
          class="flex flex-grow-1" />
        <label for="name">Name</label>
      </div>
      <div class="p-float-label mt-5 flex">
        <Textarea
          v-model="task.description"
          id="description"
          :auto-resize="true"
          rows="5"
          required="required"
          class="flex flex-grow-1" />
        <label for="description">Description</label>
      </div>
      <div class="mt-5 flex">
        <Dropdown
          v-model="task.priority"
          :options="priorities"
          input-id="priority"
          option-label="name"
          option-value="value"
          class="flex flex-grow-1"
          placeholder="Priority" />
      </div>
    </div>
    <template #footer>
      <Button
        @click="close()"
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text" />
      <Button
        @click="create()"
        label="Create task"
        :icon="createBtnIcon"
        autofocus />
    </template>
  </Dialog>
</template>

<script setup>
// TODO: create app lvl notification aria-live="polite" container
// TODO: check label
import Button from 'primevue/Button';
import Dialog from 'primevue/Dialog';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import taskApi from '@/src/api/tasks';
import Textarea from 'primevue/textarea';

const priorities = [
  { name: 'High', value: 'HIGH' },
  { name: 'Medium', value: 'MEDIUM' },
  { name: 'Low', value: 'LOW' }
];
const DEFAULT_CREATE_BTN_ICON = 'pi pi-check';
const createBtnIcon = ref(DEFAULT_CREATE_BTN_ICON);
const displayPosition = ref(false);
const task = ref({
  name: '',
  description: '',
  priority: ''
});

const open = () => { displayPosition.value = true; };
const close = () => { displayPosition.value = false; };
const create = () => {
  createBtnIcon.value = 'pi pi-spin pi-spinner';
  taskApi.create(task.value).then(data => {
    createBtnIcon.value = DEFAULT_CREATE_BTN_ICON;
    close();
  });
};
</script>
