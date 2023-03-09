<template>
  <div>
    <div class="create-wrapper flex justify-content-end">
      <slot name="activator"></slot>
    </div>
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
      <form @submit.prevent>
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
              <label for="deadline">Deadline</label>
              <div class="mt-2">
                <input v-model="validDate" id="deadline" type="datetime-local">
              </div>
            </div>
          </div>
        </div>
        <div class="dialog-actions text-right p-3">
          <Button
            @click="close()"
            label="Cancel"
            :icon="PrimeIcons.TIMES"
            class="p-button-text" />
          <Button
            @click="submit()"
            type="submit"
            :label="`${actionType} task`"
            :icon="PrimeIcons.CHECK"
            class="capitalize mr-2" />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import Button from 'primevue/Button';
import Dialog from 'primevue/Dialog';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import { PrimeIcons } from 'primevue/api';
import { priority } from '@/config/task';
import { required } from '@vuelidate/validators';
import Textarea from 'primevue/textarea';
import { useVuelidate } from '@vuelidate/core';

const props = defineProps({
  showDialog: { type: Boolean, required: true },
  actionType: { type: String, required: true },
  initialTask: { type: Object, required: true },
  activatorId: { type: String, required: true }
});
const emit = defineEmits(['close', 'action:emit']);
const nameEl = ref(null);

const priorities = priority.list.map(({ label, value }) => ({ name: label, value }));
const parseDate = deadline => {
  if (!deadline) return;
  const date = new Date(deadline);
  date.setMilliseconds(0);
  date.setSeconds(0);
  const ISOdate = date.toISOString();

  return ISOdate.slice(0, ISOdate.length - 1);
};
const task = computed(() => props.initialTask);
const validDate = ref(parseDate(task.value.deadline));

const validationRules = {
  name: { required }
};
const v$ = useVuelidate(validationRules, task);

const reset = () => {
  v$.value.$reset();
  validDate.value = parseDate(task.value.deadline);
};
const close = () => {
  reset();
  emit('close');
  focusActivator();
};
const submit = async () => {
  const isFormCorrect = await v$.value.$validate();
  focusFirstInteractiveField();
  if (!isFormCorrect) return;
  task.value.deadline = validDate;
  emit('action:emit', task.value);
  reset();
};
const focusFirstInteractiveField = () => (nameEl.value.$el.focus());
const focusActivator = () => (document.querySelector(`#${props.activatorId}`).focus());
</script>

<style lang="scss" scoped>
.error-msg {
  color: var(--red-500);
}
.required-field::before {
  content: '*';
}
</style>
