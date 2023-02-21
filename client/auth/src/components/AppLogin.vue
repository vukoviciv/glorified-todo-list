<template>
  <div class="login-wrapper min-h-screen">
    <form @submit.prevent class="pt-8">
      <Card class="m-auto md:col-6">
        <template #title>
          <h2 class="text-center">Hello!</h2>
        </template>
        <template #content>
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
              <div class="p-inputgroup">
                <div class="p-float-label">
                  <InputText
                    v-model="form.password"
                    @update:model-value="resetValidation()"
                    id="password"
                    :type="passwordFieldType"
                    required="required"
                    class="flex flex-grow-1" />
                  <label for="password">Password</label>
                </div>
                <Button
                  @click="handlePassIconClick()"
                  :icon="passwordIcon"
                  :aria-label="passwordLabel"
                  :title="passwordLabel" />
              </div>
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

const PASS_TYPES = {
  PASSWORD: {
    value: 'password',
    label: 'Show password'
  },
  TEXT: {
    value: 'text',
    label: 'Hide password'
  }
};
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
const emailEl = ref(null);
const passwordFieldType = ref('password');

const redirectToHome = () => (document.location.replace(routes.home));
const focusEmailField = () => (emailEl.value.$el.focus());
const isPassHidden = computed(() => {
  return passwordFieldType.value === PASS_TYPES.PASSWORD.value;
});
const passwordIcon = computed(() => {
  return isPassHidden.value ? PrimeIcons.EYE : PrimeIcons.EYE_SLASH;
});
const passwordLabel = computed(() => {
  return isPassHidden.value ? PASS_TYPES.PASSWORD.label : PASS_TYPES.TEXT.label;
});
const hasValidationErrors = computed(() => v$.value.email.$errors.length);
const resetValidation = () => {
  v$.value.$reset();
  customErrorMsg.value = '';
};
const handlePassIconClick = () => {
  passwordFieldType.value = isPassHidden.value ? PASS_TYPES.TEXT.value : PASS_TYPES.PASSWORD.value;
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
