<template>
  <MainHeader>
    <template #options>
      <span>Ivana Šimić</span>
      <i :class="`${PrimeIcons.USER} ml-4`"></i>
    </template>
  </MainHeader>
  <RouterView />
</template>

<script setup>
import MainHeader from '../shared/components/MainHeader.vue';
import { PrimeIcons } from 'primevue/api';
</script>
