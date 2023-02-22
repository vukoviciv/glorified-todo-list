<template>
  <LogistrationForm title="Login" :error-messages="errorMessages">
    <div class="px-8 mt-5">
      <p>Please login</p>
      <div class="p-float-label mt-5 flex">
        <InputText
          ref="emailEl"
          v-model="form.email"
          @update:model-value="resetValidation()"
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
    <template #actions>
      <div class="px-8 flex">
        <Button
          @click="login()"
          type="submit"
          label="Login"
          class="flex-grow-1" />
      </div>
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
import { computed, ref } from 'vue';
import { email, required } from '@vuelidate/validators';
import authApi from '@/auth/src/api/auth';
import Button from 'primevue/Button';
import InputText from 'primevue/inputtext';
import LogistrationForm from './common/LogistrationForm.vue';
import PasswordInput from './common/PasswordInput.vue';
import { routes } from '@/shared/utils/navigation';
import { useVuelidate } from '@vuelidate/core';

const form = ref({
  email: '',
  password: ''
});
const validationRules = {
  email: { required, email },
  password: { required }
};
const v$ = useVuelidate(validationRules, form);
const customErrorMsg = ref('');

const errorMessages = computed(() => {
  const validationErrors = v$.value.$errors.map(err => {
    return `${err.$property} ${err.$message.toLocaleLowerCase()}.`;
  });
  if (customErrorMsg.value.length > 0) validationErrors.push(customErrorMsg.value);

  return validationErrors;
});

const redirectToHome = () => (document.location.replace(routes.home));
const passwordUpdate = ({ password }) => {
  form.value.password = password;
};
const resetValidation = () => {
  v$.value.$reset();
  customErrorMsg.value = '';
};
const login = async () => {
  resetValidation();
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  const payload = form.value;

  return authApi
    .login(payload)
    .then(() => redirectToHome())
    .catch(({ response }) => {
      if ([403, 404].includes(response.status)) customErrorMsg.value = response.data;
      else customErrorMsg.value = 'Something went wrong';
    });
};
</script>
