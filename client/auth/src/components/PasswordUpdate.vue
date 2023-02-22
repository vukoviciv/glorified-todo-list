<template>
  <LogistrationForm
    @submit="update()"
    title="Password update"
    submit-text="Update Password"
    :custom-error-msg="customErrorMsg"
    :is-dirty="isDirty"
    :validation-rules="validationRules">
    <div class="px-8 mt-5">
      <div class="p-float-label mt-5 flex">
        <InputText
          v-model="form.email"
          @update:model-value="onUpdate()"
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
const customErrorMsg = ref(null);
const isDirty = ref(false);

const redirectToLogin = () => (document.location.replace(routes.login));
const passwordUpdate = ({ password }) => {
  form.value.password = password;
};
const onUpdate = () => {
  customErrorMsg.value = '';
  isDirty.value = true;
};
const update = async () => {
  customErrorMsg.value = '';
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
