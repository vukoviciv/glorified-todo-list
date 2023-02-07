<template>
  <MainHeader>
    <template #options>
      <HeaderOptions :user="user" />
    </template>
  </MainHeader>
  <RouterView />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import HeaderOptions from './components/HeaderOptions.vue';
import MainHeader from '../shared/components/MainHeader.vue';
import usersApi from '@/src/api/users';

const user = ref({});

onMounted(async () => {
  user.value = await usersApi.getMe().then(user => user);
});
</script>
