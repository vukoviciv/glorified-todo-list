<template>
  <LogistrationForm title="Registration" :error-messages="errorMessages">
    <div class="px-8 mt-5">
      <p>Create a new account</p>
      <div class="p-float-label mt-5 flex">
        <InputText
          v-model="form.firstName"
          id="firstName"
          type="text"
          class="flex flex-grow-1"
          autofocus />
        <label for="firstName">First Name</label>
      </div>
      <div class="p-float-label mt-5 flex">
        <InputText
          v-model="form.lastName"
          id="lastName"
          type="text"
          class="flex flex-grow-1" />
        <label for="lastName">Last Name</label>
      </div>
      <div class="p-float-label mt-5 flex">
        <InputText
          v-model="form.email"
          @update:model-value="resetValidation()"
          id="email"
          type="email"
          required="required"
          class="flex flex-grow-1" />
        <label for="email">Email</label>
      </div>
    </div>
    <div class="px-8 mt-5">
      <div class="mt-5 flex">
        <PasswordInput @updated="passwordUpdate($event)" />
      </div>
    </div>
    <template #actions>
      <div class="px-8 flex">
        <Button
          @click="register()"
          type="submit"
          label="Register"
          class="flex-grow-1" />
      </div>
      <div class="px-8 flex">
        <RouterLink
          :to="{ name: 'login' }"
          class="block mx-auto pt-4">
          Back to login
        </RouterLink>
      </div>
    </template>
  </LogistrationForm>
</template>

<script setup>
// TODO: add confirm password, min length etc
import { computed, ref } from 'vue';
import { email as emailValidator, required } from '@vuelidate/validators';
import authApi from '@/auth/src/api/auth';
import Button from 'primevue/Button';
import InputText from 'primevue/inputtext';
import LogistrationForm from './common/LogistrationForm.vue';
import PasswordInput from './common/PasswordInput.vue';
import { routes } from '@/shared/utils/navigation';
import { useVuelidate } from '@vuelidate/core';

const DEFAULT_ERROR_MSG = 'Something went wrong';

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
});
const customErrorMsg = ref('');

const validationRules = {
  email: { required, emailValidator },
  password: { required }
};
const v$ = useVuelidate(validationRules, form);

const errorMessages = computed(() => {
  const validationErrors = v$.value.$errors.map(err => {
    return `${err.$property} ${err.$message.toLocaleLowerCase()}.`;
  });
  if (customErrorMsg.value.length > 0) validationErrors.push(customErrorMsg.value);

  return validationErrors;
});

const redirectToLogin = () => (document.location.replace(routes.login));
const passwordUpdate = ({ password }) => (form.value.password = password);
const resetValidation = () => {
  v$.value.$reset();
  customErrorMsg.value = '';
};

const register = async () => {
  resetValidation();
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  const payload = form.value;

  return authApi
    .register(payload)
    .then(() => redirectToLogin())
    .catch(({ response }) => {
      if (response.status === 409) customErrorMsg.value = response.data;
      else customErrorMsg.value = DEFAULT_ERROR_MSG;
    });
};
</script>
