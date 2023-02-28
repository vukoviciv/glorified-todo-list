<template>
  <div v-if="hasTempPassword" class="password-warning fixed z-1 text-center">
    <p class="text-red-700 bold">
      Your account is too old and needs to use a password!
      <a :href="registerPath">Update user data</a>
    </p>
  </div>
  <MainHeader>
    <template #options>
      <HeaderOptions
        v-if="user"
        @account:switch="updateAccount($event)"
        :active-account="activeAccount"
        :user="user" />
    </template>
  </MainHeader>
  <MainPage
    v-if="!isFetching"
    @account:switch="updateAccount($event)"
    :active-account="activeAccount"
    :is-fetching="isFetching" />
  <todo-snackbar />
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import HeaderOptions from './components/HeaderOptions.vue';
import { localStorageAccount } from './components/service/localStorage';
import MainHeader from '../shared/components/MainHeader.vue';
import MainPage from './components/MainPage.vue';
import { routes } from '@/shared/utils/navigation';
import { useStore } from 'vuex';

const activeAccount = ref(localStorageAccount?.item);
const registerPath = routes.updatePassword;
const store = useStore();

const isFetching = computed(() => store.state.isFetching);
const user = computed(() => {
  return store.getters.getUser;
});
const hasTempPassword = computed(() => user.value?.hasTempPassword);

const updateAccount = account => {
  setActiveAccount(account);
};
const setActiveAccount = account => {
  activeAccount.value = account;
  localStorageAccount.setItem(account);
};

onMounted(() => {
  store.dispatch('fetchTasks');
  store.dispatch('fetchUser');
});
</script>

<style lang="scss" scoped>
.password-warning {
  width: 100%;
background-color: var(--yellow-100);
}
</style>
