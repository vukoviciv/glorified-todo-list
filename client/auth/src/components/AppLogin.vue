<template>
  <div class="login-wrapper min-h-screen">
    <form @submit.prevent class="pt-8">
      <Card class="m-auto md:col-6">
        <template #title>
          <h2 class="text-center">Hello!</h2>
        </template>
        <template #content>
          <div class="px-8 mt-5">
            <p>Please login or create a new account</p>
            <div class="p-float-label mt-5 flex">
              <InputText
                ref="emailEl"
                v-model="form.email"
                @update:model-value="resetForm()"
                id="email"
                type="email"
                required="required"
                class="flex flex-grow-1"
                autofocus />
              <label for="email">Email</label>
            </div>
            <div class="error-msg ml-1 mt-1" aria-live="polite">
              <div v-if="hasValidationErrors">
                <span v-for="error of v$.email.$errors" :key="error.$uid">
                  Field {{ error.$property }} is required.
                </span>
              </div>
              <span v-else-if="customErrorMsg">{{ customErrorMsg }}</span>
            </div>
          </div>
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
                @click="login()"
                type="submit"
                label="Login"
                class="flex-grow-1" />
            </div>
            <div class="px-8 mt-3 flex">
              <Button
                label="Register"
                class="p-button register-button flex-grow-1" />
            </div>
          </div>
        </template>
      </Card>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { email, required } from '@vuelidate/validators';
import authApi from '@/auth/src/api/auth';
import Button from 'primevue/Button';
import Card from 'primevue/card';
import Divider from 'primevue/Divider';
import InputText from 'primevue/inputtext';
import { PrimeIcons } from 'primevue/api';
import { routes } from '@/shared/utils/navigation';
import { useVuelidate } from '@vuelidate/core';

const form = ref({
  email: '',
  password: ''
});
const validationRules = {
  email: { required, email }
};
const v$ = useVuelidate(validationRules, form);
const customErrorMsg = ref('');
const emailEl = ref(null);

const redirectToHome = () => (document.location.replace(routes.home));
const focusEmailField = () => (emailEl.value.$el.focus());
const hasValidationErrors = computed(() => v$.value.email.$errors.length);
const resetForm = () => {
  v$.value.$reset();
  customErrorMsg.value = '';
};
const login = async () => {
  resetForm();
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  const payload = { email: form.value.email };

  return authApi
    .login(payload)
    .then(() => redirectToHome())
    .catch(({ response }) => {
      if (response.status === 404) { customErrorMsg.value = response.data; }
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
