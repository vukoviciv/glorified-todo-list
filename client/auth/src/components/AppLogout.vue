<template>
  <div class="logout-wrapper min-h-screen pt-5">
    <Card class="m-auto md:col-6">
      <template #title>
        <h2 class="text-center">Hello!</h2>
      </template>
      <template #content>
        <div class="px-8 mt-5">
          <p>You successfully logged out!</p>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import authApi from '@/auth/src/api/auth';
import Card from 'primevue/card';
import { onMounted } from 'vue';

onMounted(() => {
  authApi.logout();
});
</script>

<style lang="scss" scoped>
.logout-wrapper {
  background: url(../assets/auth_background.jpg);
  background-size: cover;
}
</style>
