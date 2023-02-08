<template>
  <div>
    <MainHeader>
      <template #options>
        <HeaderOptions
          v-if="!isFetching"
          :user="user" />
      </template>
    </MainHeader>
    <MainPage />
    <AccountsDialog
      v-if="showDialog"
      @account:choose="updateAccount($event)"
      :user="user" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import AccountsDialog from './components/AccountsDialog.vue';
import HeaderOptions from './components/HeaderOptions.vue';
import { localStorageAccount } from './components/service/localStorage';
import MainHeader from '../shared/components/MainHeader.vue';
import MainPage from './components/MainPage.vue';
import usersApi from '@/src/api/users';

const user = ref(null);
const isFetching = ref(true);
const showDialog = computed(() => {
  if (isFetching.value) return false;
  const activeAccount = localStorageAccount.item;
  console.log(activeAccount);
  return !activeAccount;
});

const updateAccount = account => {
  console.log('updated account', account);
};

onMounted(async () => {
  user.value = await usersApi.getMe().then(user => user);
  isFetching.value = false;
});
</script>
