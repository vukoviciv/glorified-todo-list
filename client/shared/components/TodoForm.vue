<template>
  <div class="min-h-screen">
    <form @submit.prevent v-bind="$attrs">
      <Card class="m-auto">
        <template v-if="title" #title>
          <h2 class="text-center">{{ title }}</h2>
        </template>
        <template #content>
          <slot></slot>
        </template>
        <template #footer>
          <Divider v-if="withDivider" align="center">
            <div class="inline-flex">
              <span :class="`${PrimeIcons.USER} mx-2`"></span>
            </div>
          </Divider>
          <div class="error-msg px-8 mb-2" aria-live="polite">
            <div v-if="hasErrors">
              <p v-for="(error, index) of errorMessages" :key="index">
                <span class="">{{ error }}</span>
              </p>
            </div>
          </div>
          <div class="mb-5">
            <div class="px-8 flex">
              <Button
                @click="submit()"
                type="submit"
                :disabled="!submitEnabled"
                :label="submitText"
                class="flex-grow-1" />
            </div>
            <slot name="additional-actions"></slot>
          </div>
        </template>
      </Card>
    </form>
  </div>
</template>

<script setup>
// TODO: error messages are clumsy (badly worded, documentation requires handling case by case)
import { computed, ref, watch } from 'vue';
import Button from 'primevue/Button';
import Card from 'primevue/card';
import Divider from 'primevue/Divider';
import { PrimeIcons } from 'primevue/api';
import { useVuelidate } from '@vuelidate/core';

const DEFAULT_ERROR_MSG = 'Something went wrong. Try again later.';
const props = defineProps({
  title: { type: String, default: null },
  form: { type: Object, default: () => ({}) },
  submitText: { type: String, default: 'Submit' },
  submitAction: { type: Function, required: true },
  submitEnabled: { type: Boolean, default: true },
  validationRules: { type: Object, default: () => ({}) },
  isDirty: { type: Boolean, required: true },
  withDivider: { type: Boolean, default: false },
  dividerIcon: { type: String, default: PrimeIcons.USER }
});
const emit = defineEmits(['submit', 'reset:dirty']);
const v$ = useVuelidate(props.validationRules, props.form);
const customErrorMsg = ref(null);

const getValidationErrors = () => {
  return v$.value.$errors.map(err => {
    return `${err.$property} - ${err.$message.toLocaleLowerCase()}.`;
  });
};
const errorMessages = computed(() => {
  const errors = getValidationErrors();
  if (customErrorMsg.value) {
    errors.push(customErrorMsg.value);
  }

  return errors;
});
const hasErrors = computed(() => errorMessages.value.length > 0);

const resetValidation = () => {
  v$.value.$reset();
};
const submit = async () => {
  resetValidation();
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    emit('reset:dirty');
    return;
  }

  return props.submitAction()
    .then(() => {
      emit('submit');
      resetValidation();
    })
    .catch(({ response }) => {
      if (response.data) {
        customErrorMsg.value = response.data;
      } else {
        customErrorMsg.value = DEFAULT_ERROR_MSG;
      }
    });
};
watch(() => props.isDirty, val => {
  if (val) resetValidation();
});
</script>
<script>
export default {
  inheritAttrs: false
};
</script>

<style lang="scss" scoped>
.error-msg {
    color: var(--red-500);
  }
</style>
