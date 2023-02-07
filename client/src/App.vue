<template>
  <MainHeader>
    <template #options>
      <HeaderOptions />
    </template>
  </MainHeader>
  <RouterView />
</template>

<script setup>
import HeaderOptions from './components/HeaderOptions.vue';
import MainHeader from '../shared/components/MainHeader.vue';
</script>
