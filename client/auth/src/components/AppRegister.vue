<template>
  <div class="login-wrapper min-h-screen">
    <form @submit.prevent class="pt-8">
      <Card class="m-auto md:col-6">
        <template #title>
          <h2 class="text-center">Hello!</h2>
        </template>
        <template #content>
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
                ref="emailEl"
                v-model="form.email"
                @update:model-value="resetValidation()"
                id="email"
                type="email"
                required="required"
                class="flex flex-grow-1" />
              <label for="email">Email</label>
            </div>
            <div class="error-msg ml-1 mt-1" aria-live="polite">
              <span v-for="error of v$.email.$errors" :key="error.$uid">
                Field {{ error.$property }} is required.
              </span>
            </div>
          </div>
          <div class="px-8 mt-5">
            <div class="mt-5 flex">
              <PasswordInput
                @updated="passwordUpdate($event)" />
            </div>
            <div class="error-msg ml-1 mt-1" aria-live="polite">
              <span v-for="error of v$.password.$errors" :key="error.$uid">
                Field {{ error.$property }} is required.
              </span>
            </div>
          </div>
          <span v-if="customErrorMsg">{{ customErrorMsg }}</span>
        </template>
        <template #footer>
          <Divider align="center">
            <div class="inline-flex">
              <span :class="`${PrimeIcons.USER} mx-2`"></span>
            </div>
          </Divider>
          <div class="mb-5">
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
          </div>
        </template>
      </Card>
    </form>
  </div>
</template>

<script setup>
// TODO: add confirm password, min length etc
import { email, required } from '@vuelidate/validators';
import authApi from '@/auth/src/api/auth';
import Button from 'primevue/Button';
import Card from 'primevue/card';
import Divider from 'primevue/Divider';
import InputText from 'primevue/inputtext';
import PasswordInput from './common/PasswordInput.vue';
import { PrimeIcons } from 'primevue/api';
import { ref } from 'vue';
import { routes } from '@/shared/utils/navigation';
import { useVuelidate } from '@vuelidate/core';

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
});
const validationRules = {
  email: { required, email },
  password: { required }
};
const v$ = useVuelidate(validationRules, form);
const customErrorMsg = ref('');
const emailEl = ref(null);

const redirectToLogin = () => (document.location.replace(routes.login));
const focusEmailField = () => (emailEl.value.$el.focus());

const passwordUpdate = ({ password }) => {
  console.log({ password });
  form.value.password = password;
};
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
      else customErrorMsg.value = 'Something went wrong';
    })
    .finally(() => {
      focusEmailField();
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
