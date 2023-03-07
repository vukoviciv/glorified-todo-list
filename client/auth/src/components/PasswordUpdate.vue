<template>
  <TodoForm
    @reset:dirty="isDirty = false"
    :submit-action="update"
    :validation-rules="validationRules"
    :form="form"
    :is-dirty="isDirty"
    title="Password update"
    submit-text="Update Password"
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
      <RequiredFieldWrapper class="mt-5 p-inputgroup">
        <PasswordInput
          @updated="passwordUpdate($event)"
          autocomplete="new-password" />
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
// TODO: add confirm password, min length etc
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
  password: { required },
  email: { required, email }
};
const isDirty = ref(false);

const redirectToLogin = () => (document.location.replace(routes.login));
const passwordUpdate = ({ password }) => {
  form.value.password = password;
  isDirty.value = true;
};
const update = () => {
  return authApi
    .updatePassword(form.value)
    .then(({ success }) => {
      if (success) redirectToLogin();
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
}
</style>
