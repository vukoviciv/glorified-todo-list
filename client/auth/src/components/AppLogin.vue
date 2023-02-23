<template>
  <LogistrationForm
    @reset:dirty="isDirty = false"
    :validation-rules="validationRules"
    :form="form"
    :submit-action="login"
    :is-dirty="isDirty"
    submit-text="Login"
    title="Login">
    <div class="px-8 mt-5">
      <p>All fields marked with * are required</p>
      <RequiredFieldWrapper class="mt-5 p-inputgroup">
        <div class="p-float-label flex">
          <InputText
            v-model="form.email"
            @update:model-value="isDirty=true"
            id="email"
            type="email"
            required="required"
            class="flex flex-grow-1"
            autocomplete="email"
            autofocus />
          <label for="email">Email</label>
        </div>
      </RequiredFieldWrapper>
      <RequiredFieldWrapper class="mt-5 flex">
        <PasswordInput
          @updated="passwordUpdate($event)"
          autocomplete="current-password"
          aria-describedby="required-field-description" />
      </RequiredFieldWrapper>
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
import RequiredFieldWrapper from './common/RequiredFieldWrapper.vue';
import { routes } from '@/shared/utils/navigation';

const form = ref({
  email: '',
  password: ''
});
const validationRules = {
  email: { required, email },
  password: { required }
};
const isDirty = ref(false);

const redirectToHome = () => (document.location.replace(routes.home));
const passwordUpdate = ({ password }) => {
  form.value.password = password;
  isDirty.value = true;
};

const login = () => {
  return authApi
    .login(form.value)
    .then(() => redirectToHome());
};
</script>
