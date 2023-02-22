<template>
  <LogistrationForm
    :validation-rules="validationRules"
    :form="form"
    :submit-action="login"
    submit-text="Login"
    title="Login">
    <div class="px-8 mt-5">
      <p>Please login</p>
      <div class="p-float-label mt-5 flex">
        <InputText
          ref="emailEl"
          v-model="form.email"
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
    <template #additional-actions>
      <div class="px-8 mt-3 flex">
        <RouterLink
          :to="{ name: 'register' }"
          class="block mx-auto pt-4">
          Register a new account
        </RouterLink>
      </div>
      <div class="px-8 mt-3 flex">
        <RouterLink
          :to="{ name: 'update-password' }"
          class="block mx-auto pt-4">
          I don't have a password
        </RouterLink>
      </div>
    </template>
  </LogistrationForm>
</template>

<script setup>
import { email, required } from '@vuelidate/validators';
import authApi from '@/auth/src/api/auth';
import InputText from 'primevue/inputtext';
import LogistrationForm from './common/LogistrationForm.vue';
import PasswordInput from './common/PasswordInput.vue';
import { ref } from 'vue';
import { routes } from '@/shared/utils/navigation';

const form = ref({
  email: '',
  password: ''
});
const validationRules = {
  email: { required, email },
  password: { required }
};

const redirectToHome = () => (document.location.replace(routes.home));
const passwordUpdate = ({ password }) => {
  form.value.password = password;
};

const login = async () => {
  const payload = form.value;

  return authApi
    .login(payload)
    .then(() => redirectToHome());
};
</script>
