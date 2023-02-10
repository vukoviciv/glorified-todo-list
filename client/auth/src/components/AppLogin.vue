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
                v-model="email"
                id="email"
                type="email"
                required="required"
                class="flex flex-grow-1"
                autofocus />
              <label for="email">Email</label>
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
import { onMounted, ref } from 'vue';
import authApi from '@/auth/src/api/auth';
import Button from 'primevue/Button';
import Card from 'primevue/card';
import Divider from 'primevue/Divider';
import InputText from 'primevue/inputtext';
import { PrimeIcons } from 'primevue/api';
import { required } from '@vuelidate/validators';
import { routes } from '@/shared/utils/navigation';
import { useVuelidate } from '@vuelidate/core';

const email = ref('');
const validationRules = {
  email: { required }
};
const v$ = useVuelidate(validationRules);

const redirectToHome = () => (document.location.replace(routes.home));
const login = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;

  const payload = { email: email.value };
  await authApi
    .login(payload)
    .then(() => redirectToHome());
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  background: url(../assets/auth_background.jpg);
  background-size: cover;

  .register-button {
    background-color: var(--purple-50);
    color: var(--purple-500);
    border: 1px solid var(--purple-500);
  }
}
</style>
