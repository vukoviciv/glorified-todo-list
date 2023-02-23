<template>
  <LogistrationForm
    :validation-rules="validationRules"
    :form="form"
    :submit-action="register"
    submit-text="Register"
    title="Registration">
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
    <template #additional-actions>
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
import { email as emailValidator, required } from '@vuelidate/validators';
import authApi from '@/auth/src/api/auth';
import InputText from 'primevue/inputtext';
import LogistrationForm from './common/LogistrationForm.vue';
import PasswordInput from './common/PasswordInput.vue';
import { ref } from 'vue';
import { routes } from '@/shared/utils/navigation';

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
});
const validationRules = {
  email: { required, emailValidator },
  password: { required }
};

const redirectToLogin = () => (document.location.replace(routes.login));
const passwordUpdate = ({ password }) => (form.value.password = password);

const register = () => {
  return authApi
    .register(form.value)
    .then(() => redirectToLogin());
};
</script>
