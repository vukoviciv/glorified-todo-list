<template>
  <div class="login-wrapper min-h-screen">
    <form @submit.prevent class="pt-8">
      <Card class="m-auto md:col-6">
        <template #title>
        </template>
        <template #content>
          <div class="px-8 mt-5">
            <p>Create a password</p>
          </div>
          <div class="px-8 mt-5">
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
              <span v-for="error of v$.password.$errors" :key="error.$uid">
                Field {{ error.$property }} is required.
              </span>
            </div>
          </div>
          <span v-if="customErrorMsg">{{ customErrorMsg }}</span>
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
                @click="update()"
                type="submit"
                label="Update password"
                class="flex-grow-1" />
            </div>
          </div>
        </template>
      </Card>
    </form>
  </div>
</template>

<script setup>
// TODO: add confirm password, min length etc
import { computed, ref } from 'vue';
import authApi from '@/auth/src/api/auth';
import Button from 'primevue/Button';
import Card from 'primevue/card';
import Divider from 'primevue/Divider';
import InputText from 'primevue/inputtext';
import { PrimeIcons } from 'primevue/api';
import { required } from '@vuelidate/validators';
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
  password: { required }
};
const v$ = useVuelidate(validationRules, form);
const customErrorMsg = ref('');
const emailEl = ref(null);
const passwordFieldType = ref('password');

const redirectToLogin = () => (document.location.replace(routes.login));
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
const resetValidation = () => {
  v$.value.$reset();
  customErrorMsg.value = '';
};
const handlePassIconClick = () => {
  passwordFieldType.value = isPassHidden.value ? PASS_TYPES.TEXT.value : PASS_TYPES.PASSWORD.value;
};
const update = async () => {
  resetValidation();
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  const payload = form.value;

  return authApi
    .updatePassword(payload)
    .then(({ success }) => {
      if (success) redirectToLogin();
    })
    .catch(({ response }) => {
      if (response.status === 401) customErrorMsg.value = response.data;
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
