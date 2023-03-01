<template>
  <main class="main-container p-5 m-auto">
    <TasksMain
      @update:order="updateOrder"
      @task:created="taskCreated()" />
    <AccountsDialog
      v-if="showDialog"
      @account:switch="$emit('account:switch', $event)" />
  </main>
</template>

<script setup>
import AccountsDialog from './AccountsDialog.vue';
import { computed } from 'vue';
import { orderBy } from '@/config/task';
import TasksMain from './Task/index.vue';
import { useStore } from 'vuex';

const store = useStore();
const emit = defineEmits(['account:switch', 'fetch']);

const showDialog = computed(() => store.getters?.getActiveAccounts);

const updateOrder = ({ value }) => {
  const item = orderBy.list[value];
  const params = {
    orderBy: item.value
  };
  emit('fetch', params);
};
const taskCreated = () => {
  emit('fetch');
};
</script>
<style lang="scss" scoped>
.main-container {
  max-width: 82rem;
  font-family: 'Roboto', sans-serif;
}
</style>
