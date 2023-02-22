<template>
  <LogistrationWrapper title="Password update" :error-messages="errorMessages">
    <div class="px-8 mt-5">
      <div class="p-float-label mt-5 flex">
        <InputText
          ref="emailEl"
          v-model="form.email"
          @update:model-value="resetValidation()"
          id="email"
          type="email"
          required="required"
          class="flex flex-grow-1"
          autofocus />
        <label for="email">Email</label>
      </div>
      <div class="mt-5 flex">
        <PasswordInput @updated="passwordUpdate($event)" />
      </div>
    </div>
    <template #actions>
      <div class="px-8 flex">
        <Button
          @click="update()"
          type="submit"
          label="Update password"
          class="flex-grow-1" />
      </div>
    </template>
  </LogistrationWrapper>
</template>

<script setup>
// TODO: add confirm password, min length etc
import { computed, ref } from 'vue';
import { email, required } from '@vuelidate/validators';
import authApi from '@/auth/src/api/auth';
import Button from 'primevue/Button';
import InputText from 'primevue/inputtext';
import LogistrationWrapper from './common/LogistrationWrapper.vue';
import PasswordInput from './common/PasswordInput.vue';
import { routes } from '@/shared/utils/navigation';
import { useVuelidate } from '@vuelidate/core';

const form = ref({
  email: '',
  password: ''
});
const validationRules = {
  email: { required, email },
  password: { required }
};
const v$ = useVuelidate(validationRules, form);
const customErrorMsg = ref(null);
const emailEl = ref(null);

const errorMessages = computed(() => {
  const validationErrors = v$.value.$errors.map(err => {
    console.log(err);
    return `${err.$property} ${err.$message.toLocaleLowerCase()}.`;
  });
  if (customErrorMsg.value) validationErrors.push(customErrorMsg.value);

  console.log(v$.value);
  return validationErrors;
});
const redirectToLogin = () => (document.location.replace(routes.login));
const passwordUpdate = ({ password }) => {
  form.value.password = password;
};
const resetValidation = () => {
  v$.value.$reset();
  customErrorMsg.value = null;
};
const update = async () => {
  resetValidation();
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  const payload = form.value;

  return authApi
    .updatePassword(payload)
    .then(({ success }) => {
      if (success) redirectToLogin();
    })
    .catch(({ response }) => {
      if (response.status === 401) customErrorMsg.value = response.data;
      else customErrorMsg.value = 'Something went wrong';
    });
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  background: url(../assets/auth_background.jpg);
  background-size: cover;

  .error-msg {
    color: var(--red-500);
  }

  .register-button {
    background-color: var(--purple-50);
    color: var(--purple-500);
    border: 1px solid var(--purple-500);
  }
}
</style>
