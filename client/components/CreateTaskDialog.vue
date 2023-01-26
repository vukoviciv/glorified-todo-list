<template>
  <div class="create-wrapper flex justify-content-end">
    <Button
      @click="open"
      label="Create new task"
      :icon="PrimeIcons.PLUS" />
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
      <div v-for="error of v$.name.$errors" :key="error.$uid">
        <div class="error-msg ml-1 mt-1" aria-live="polite">
          Field {{ error.$property }} is required.
        </div>
      </div>
      <div class="p-float-label mt-5 flex">
        <Textarea
          v-model="task.description"
          id="description"
          :auto-resize="true"
          rows="5"
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
        :icon="PrimeIcons.TIMES"
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
import { PrimeIcons } from 'primevue/api';
import { ref } from 'vue';
import { required } from '@vuelidate/validators';
import taskApi from '@/src/api/tasks';
import Textarea from 'primevue/textarea';
import { useVuelidate } from '@vuelidate/core';

const priorities = [
  { name: 'High', value: 'HIGH' },
  { name: 'Medium', value: 'MEDIUM' },
  { name: 'Low', value: 'LOW' }
];
const CREATE_BTN_ICON = PrimeIcons.CHECK;
const LOADING_BTN_ICON = PrimeIcons.SPINNER;
const createBtnIcon = ref(CREATE_BTN_ICON);
const displayPosition = ref(false);
const task = ref({
  name: '',
  description: '',
  priority: ''
});
const validationRules = {
  name: { required }
};
const v$ = useVuelidate(validationRules, task);

const open = () => { displayPosition.value = true; };
const close = () => {
  displayPosition.value = false;
  v$.value.$reset();
};
const create = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;

  createBtnIcon.value = LOADING_BTN_ICON;
  taskApi.create(task.value).then(data => {
    createBtnIcon.value = CREATE_BTN_ICON;
    close();
  });
};
</script>

<style lang="scss" scoped>
.error-msg {
  color: var(--red-500);
}
</style>
