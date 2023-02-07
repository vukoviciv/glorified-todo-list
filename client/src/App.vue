<template>
  <MainHeader>
    <template #options>
      <span>Ivana Šimić</span>
      | <Button @click="logout">Logout</Button>
      <span :class="`${PrimeIcons.USER} ml-4`"></span>
    </template>
  </MainHeader>
  <RouterView />
</template>

<script setup>
import Button from 'primevue/Button';
import MainHeader from '../shared/components/MainHeader.vue';
import { PrimeIcons } from 'primevue/api';
import { routes } from '@/shared/utils/navigation';

const logout = () => {
  document.location.replace(routes.logout);
};
</script>
