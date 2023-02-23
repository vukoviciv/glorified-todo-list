<template>
  <LogistrationForm
    @reset:dirty="isDirty = false"
    :validation-rules="validationRules"
    :form="form"
    :submit-action="register"
    :is-dirty="isDirty"
    submit-text="Register"
    title="Registration">
    <div class="px-8 mt-5">
      <p>Create a new account</p>
      <div class="p-float-label mt-5 flex">
        <InputText
          v-model="form.firstName"
          @update:model-value="isDirty=true"
          id="firstName"
          type="text"
          class="flex flex-grow-1"
          autocomplete="given-name"
          autofocus />
        <label for="firstName">First Name</label>
      </div>
      <div class="p-float-label mt-5 flex">
        <InputText
          v-model="form.lastName"
          @update:model-value="isDirty=true"
          id="lastName"
          type="text"
          autocomplete="family-name"
          class="flex flex-grow-1" />
        <label for="lastName">Last Name</label>
      </div>
      <div class="p-float-label mt-5 flex">
        <InputText
          v-model="form.email"
          @update:model-value="isDirty=true"
          id="email"
          type="email"
          required="required"
          autocomplete="email"
          class="flex flex-grow-1" />
        <label for="email">Email</label>
      </div>
    </div>
    <div class="px-8 mt-5">
      <div class="mt-5 flex">
        <PasswordInput
          @updated="passwordUpdate($event)"
          autocomplete="new-password" />
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
const isDirty = ref(false);

const redirectToLogin = () => (document.location.replace(routes.login));
const passwordUpdate = ({ password }) => {
  form.value.password = password;
  isDirty.value = true;
};

const register = () => {
  return authApi
    .register(form.value)
    .then(() => redirectToLogin());
};
</script>
