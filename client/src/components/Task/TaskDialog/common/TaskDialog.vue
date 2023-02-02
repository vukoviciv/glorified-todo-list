<template>
  <div>
    <div class="create-wrapper flex justify-content-end">
      <slot name="activator"></slot>
    </div>
    <form>
      <Dialog
        @update:visible="close()"
        :visible="showDialog"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }"
        :draggable="false"
        aria-labelledby="dialog-header-title"
        position="top"
        modal>
        <template #header>
          <h1 id="dialog-header-title" class="text-2xl">
            <span class="capitalize">{{ actionType }}</span> task
          </h1>
        </template>
        <div class="m-0 p-3">
          <div class="p-float-label flex">
            <InputText
              ref="nameEl"
              v-model="task.name"
              id="name"
              type="text"
              required="required"
              class="flex-grow-1"
              aria-describedby="required-field-description"
              autofocus />
            <label for="name">Name</label>
          </div>
          <small id="required-field-description" class="required-field">
            This field is required
          </small>
          <div class="error-msg ml-1 mt-1" aria-live="polite">
            <span v-for="error of v$.name.$errors" :key="error.$uid">
              Field {{ error.$property }} is required.
            </span>
          </div>
          <div class="p-float-label mt-5 flex">
            <Textarea
              v-model="task.description"
              id="description"
              rows="5"
              class="flex-grow-1"
              auto-resize />
            <label for="description">Description</label>
          </div>
          <div class="flex">
            <div class="mt-4 col-6">
              <label for="priority">Priority</label>
              <Dropdown
                v-model="task.priority"
                :model-value="Number.parseInt(task.priority)"
                :options="priorities"
                input-id="priority"
                option-label="name"
                option-value="value"
                class="flex flex-grow-1 mt-2" />
            </div>
            <div class="mt-4 col-6">
              <label for="deadline" class="mr-3">Deadline</label>
              <Calendar
                v-model="task.deadline"
                input-id="deadline"
                class="flex flex-grow-1 mt-2"
                show-time />
            </div>
          </div>
        </div>
        <template #footer>
          <Button
            @click="close()"
            label="Cancel"
            :icon="PrimeIcons.TIMES"
            class="p-button-text" />
          <Button
            @click="action()"
            :label="`${actionType} task`"
            :icon="PrimeIcons.CHECK"
            class="capitalize" />
        </template>
      </Dialog>
    </form>
  </div>
</template>

<script setup>
// TODO: use form here!!!
// TODO: Dialog does not have a heading?!
// TODO: check label for priority
// TODO: focus back on activator after the dialog is closed
import Button from 'primevue/Button';
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/Dialog';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import { PrimeIcons } from 'primevue/api';
import { priority } from '@/config/task';
import { ref } from 'vue';
import { required } from '@vuelidate/validators';
import Textarea from 'primevue/textarea';
import { useVuelidate } from '@vuelidate/core';

const DEFAULT_TASK = {
  name: '',
  description: '',
  priority: '',
  deadline: ''
};

const props = defineProps({
  showDialog: { type: Boolean, required: true },
  actionType: { type: String, required: true },
  task: { type: Object, default: () => ({}) }
});
const emit = defineEmits(['close', 'action:emit']);
const nameEl = ref(null);
const priorities = priority.list.map(({ label, value }) => ({ name: label, value }));
const task = ref(props.task) || ref(DEFAULT_TASK);
const validationRules = {
  name: { required }
};
const v$ = useVuelidate(validationRules, task);

const close = () => {
  v$.value.$reset();
  emit('close');
};
const action = async () => {
  const isFormCorrect = await v$.value.$validate();
  nameEl.value.$el.focus();
  if (!isFormCorrect) return;

  emit('action:emit', task.value);
};
</script>

<style lang="scss" scoped>
.error-msg {
  color: var(--red-500);
}
.required-field::before {
  content: '*';
}
</style>
