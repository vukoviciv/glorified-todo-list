<template>
  <MainHeader>
    <template #options>
      <HeaderOptions
        v-if="!isFetching"
        @account:switch="updateAccount($event)"
        :user="user"
        :active-account="activeAccount" />
    </template>
  </MainHeader>
  <MainPage
    v-if="!isFetching"
    @account:switch="updateAccount($event)"
    @fetch="fetchTasks($event)"
    :tasks="items"
    :active-account="activeAccount"
    :user="user"
    :is-fetching="isFetching" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import HeaderOptions from './components/HeaderOptions.vue';
import { localStorageAccount } from './components/service/localStorage';
import MainHeader from '../shared/components/MainHeader.vue';
import MainPage from './components/MainPage.vue';
import taskApi from '@/src/api/tasks';
import usersApi from '@/src/api/users';

const user = ref(null);
const isFetching = ref(true);
const activeAccount = ref(localStorageAccount?.item);
const items = ref([]);

const updateAccount = account => {
  activeAccount.value = account;
  localStorageAccount.setItem(account);
  const params = { accountId: account.id };
  fetchTasks(params);
};

const fetchTasks = async (params = {}) => {
  isFetching.value = true;
  const accountId = params.accountId ? params.accountId : activeAccount.value?.id;
  if (!accountId) return;
  items.value = await taskApi
    .fetch({ ...params, accountId })
    .then(tasks => tasks);
  isFetching.value = false;
};

const fetchUser = async () => {
  isFetching.value = true;
  user.value = await usersApi.getMe().then(user => user);
  isFetching.value = false;
};

onMounted(async () => {
  await fetchUser();
  await fetchTasks();
});
</script>
