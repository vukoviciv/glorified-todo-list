<template>
  <TodoForm
    @reset:dirty="isDirty = false"
    :validation-rules="validationRules"
    :form="form"
    :submit-action="login"
    :is-dirty="isDirty"
    submit-text="Login"
    title="Login"
    class="login-wrapper pt-8 md:col-6 m-auto"
    with-divider>
    <div class="px-8 mt-5">
      <p class="ml-3">All fields marked with * are required</p>
      <RequiredFieldWrapper class="mt-5 p-inputgroup">
        <div class="p-float-label">
          <InputText
            v-model="form.email"
            @update:model-value="isDirty=true"
            id="email"
            type="email"
            required="required"
            autocomplete="email"
            autofocus />
          <label for="email">Email</label>
        </div>
      </RequiredFieldWrapper>
      <RequiredFieldWrapper class="mt-5 flex">
        <PasswordInput
          v-model="form.password"
          @update:model-value="isDirty=true"
          id="password"
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
  </TodoForm>
</template>

<script setup>
import { email, required } from '@vuelidate/validators';
import authApi from '@/auth/src/api/auth';
import InputText from 'primevue/inputtext';
import PasswordInput from './common/PasswordInput.vue';
import { ref } from 'vue';
import RequiredFieldWrapper from './common/RequiredFieldWrapper.vue';
import { routes } from '@/shared/utils/navigation';
import TodoForm from '../../../shared/components/TodoForm.vue';

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
const login = () => {
  return authApi
    .login(form.value)
    .then(() => redirectToHome());
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  background: url(../assets/auth_background.jpg);
  background-size: cover;

  .error-msg {
    color: var(--red-500);
  }
}
</style>
