<template>
  <div v-if="hasTempPassword" class="password-warning fixed z-1 text-center">
    <p class="text-red-700 bold">
      Your account is too old and needs to use a password!
      <a :href="registerPath">Update user data</a>
    </p>
  </div>
  <MainHeader>
    <template #options>
      <HeaderOptions v-if="user" :user="user" />
    </template>
  </MainHeader>
  <TasksSkeleton v-if="isFetching" />
  <MainPage v-else />
  <todo-snackbar />
</template>

<script setup>
import { computed, onMounted } from 'vue';
import HeaderOptions from './components/HeaderOptions.vue';
import MainHeader from '../shared/components/MainHeader.vue';
import MainPage from './components/MainPage.vue';
import { routes } from '@/shared/utils/navigation';
import TasksSkeleton from './components/Task/TodayTasks/TasksSkeleton.vue';
import { useStore } from 'vuex';

const registerPath = routes.updatePassword;
const store = useStore();

const isFetching = computed(() => store.state.isFetching);
const user = computed(() => store.state.user);
const hasTempPassword = computed(() => user.value?.hasTempPassword);

onMounted(() => {
  store.dispatch('initialFetch');
});
</script>

<style lang="scss" scoped>
.password-warning {
  width: 100%;
background-color: var(--yellow-100);
}
</style>
