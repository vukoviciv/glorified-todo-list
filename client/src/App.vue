<template>
  <MainHeader>
    <template #options>
      <span>Ivana Šimić</span>
      <span :class="`${PrimeIcons.USER} ml-4`"></span>
    </template>
  </MainHeader>
  <RouterView />
</template>

<script setup>
import MainHeader from '../shared/components/MainHeader.vue';
import { PrimeIcons } from 'primevue/api';
</script>
