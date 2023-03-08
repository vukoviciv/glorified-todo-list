<template>
  <TodoForm
    @reset:dirty="isDirty = false"
    :validation-rules="validationRules"
    :form="form"
    :submit-action="register"
    :is-dirty="isDirty"
    submit-text="Register"
    title="Registration"
    class="login-wrapper pt-8 md:col-6 m-auto"
    with-divider>
    <div class="px-8 mt-5">
      <p class="ml-3">All fields marked with * are required</p>
      <div class="p-float-label mt-5 ml-3 flex">
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
      <div class="p-float-label mt-5  ml-3 flex">
        <InputText
          v-model="form.lastName"
          @update:model-value="isDirty=true"
          id="lastName"
          type="text"
          autocomplete="family-name"
          class="flex flex-grow-1" />
        <label for="lastName">Last Name</label>
      </div>
      <RequiredFieldWrapper class="mt-5 p-inputgroup">
        <div class="p-float-label">
          <InputText
            v-model="form.email"
            @update:model-value="isDirty=true"
            id="email"
            type="email"
            required="required"
            autocomplete="email" />
          <label for="email">Email</label>
        </div>
      </RequiredFieldWrapper>
    </div>
    <div class="px-8 mt-5">
      <RequiredFieldWrapper class="mt-5 flex">
        <PasswordInput
          v-model="form.password"
          @update:model-value="isDirty=true"
          id="password"
          autocomplete="new-password" />
      </RequiredFieldWrapper>
    </div>
    <div class="px-8 mt-5">
      <RequiredFieldWrapper class="mt-5 flex">
        <PasswordInput
          v-model="form.confirmPassword"
          @update:model-value="isDirty=true"
          id="custom-password"
          autocomplete="new-password"
          label="Confirm password" />
      </RequiredFieldWrapper>
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
  </TodoForm>
</template>

<script setup>
import { computed, ref } from 'vue';
import { email as emailValidator, minLength, required, sameAs } from '@vuelidate/validators';
import authApi from '@/auth/src/api/auth';
import InputText from 'primevue/inputtext';
import PasswordInput from './common/PasswordInput.vue';
import RequiredFieldWrapper from './common/RequiredFieldWrapper.vue';
import { routes } from '@/shared/utils/navigation';
import TodoForm from '../../../shared/components/TodoForm.vue';

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
});
const validationRules = {
  email: { required, emailValidator },
  password: { required, minLength: minLength(6) },
  confirmPassword: {
    required,
    minLength: minLength(6),
    sameAsPassword: sameAs(computed(() => form.value.password))
  }
};
const isDirty = ref(false);

const redirectToAccountCreation = () => (document.location.replace(routes.createAccount));
const register = () => {
  return authApi
    .register(form.value)
    .then(() => redirectToAccountCreation());
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  background: url(../assets/auth_background.jpg);
  background-size: cover;
}
</style>
