<template>
  <div class="login-wrapper min-h-screen">
    <form class="pt-8">
      <Card class="m-auto md:col-6">
        <template #title>
          <h2 class="text-center">Hello!</h2>
        </template>
        <template #content>
          <div class="px-8 mt-5">
            <p>Please login or create a new account</p>
            <div class="p-float-label mt-5 flex">
              <InputText
                v-model="email"
                id="email"
                type="email"
                class="flex flex-grow-1" />
              <label for="email">Email</label>
            </div>
            <div class="p-float-label mt-4 flex">
              <InputText
                v-model="password"
                id="password"
                type="password"
                class="flex flex-grow-1" />
              <label for="password">Password</label>
            </div>
          </div>
        </template>
        <template #footer>
          <Divider align="center">
            <div class="inline-flex">
              <i :class="`${PrimeIcons.USER} mx-2`"></i>
            </div>
          </Divider>
          <div class="mb-5">
            <div class="px-8 flex">
              <Button
                type="submit"
                label="Login"
                class="flex flex-grow-1" />
            </div>
            <div class="px-8 mt-3 flex">
              <Button
                label="Register"
                class="p-button register-button flex flex-grow-1" />
            </div>
          </div>
        </template>
      </Card>
    </form>
  </div>
</template>

<script setup>
import Button from 'primevue/Button';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import { PrimeIcons } from 'primevue/api';
import { ref } from 'vue';
// TODO: email for login? add to user db
const email = ref('');
const password = ref('');
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
