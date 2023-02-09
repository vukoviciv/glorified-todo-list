<template>
  <MainHeader>
    <template #options>
      <HeaderOptions
        v-if="!isFetching"
        :user="user"
        :active-account="activeAccount" />
    </template>
  </MainHeader>
  <MainPage
    v-if="!isFetching"
    @account:choose="updateAccount($event)"
    :active-account="activeAccount"
    :user="user" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import HeaderOptions from './components/HeaderOptions.vue';
import { localStorageAccount } from './components/service/localStorage';
import MainHeader from '../shared/components/MainHeader.vue';
import MainPage from './components/MainPage.vue';
import usersApi from '@/src/api/users';

const user = ref(null);
const isFetching = ref(true);
const activeAccount = ref(localStorageAccount?.item);

const updateAccount = account => {
  activeAccount.value = account;
};

onMounted(async () => {
  user.value = await usersApi.getMe().then(user => user);
  isFetching.value = false;
});
</script>
