<template>
  <main class="main-container p-5 m-auto">
    <TasksMain
      @toggle:task="toggleDone"
      @task:edit="updateItemsList($event)"
      @task:delete="taskDelete($event)"
      @update:order="updateOrder"
      @task:created="handleTaskCreate"
      :items="items"
      :is-fetching="isFetching" />
    <AccountsDialog
      v-if="showDialog"
      @account:choose="updateAccount($event)"
      :user="user" />
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import AccountsDialog from './AccountsDialog.vue';
import { orderBy } from '@/config/task';
import taskApi from '@/src/api/tasks';
import TasksMain from './Task/index.vue';

const props = defineProps({
  user: { type: Object, required: true },
  activeAccount: { type: Object, default: () => ({}) }
});

const isFetching = ref(true);
const items = ref([]);

const handleTaskCreate = () => {
  fetchItems();
};
const showDialog = computed(() => {
  return !props.activeAccount;
});
const emit = defineEmits(['account:choose']);
// TODO: use export default and suspense/default on the parent component
const fetchItems = async (params = {}) => {
  isFetching.value = true;
  const accountId = params.accountId ? params.accountId : props.activeAccount?.id;
  if (!accountId) return;
  await taskApi.fetch({ ...params, accountId })
    .then(tasks => {
      items.value = tasks;
      isFetching.value = false;
    });
};
const updateItemsList = task => {
  items.value = items.value.map(item => {
    return item.id === task.id ? task : item;
  });
};
const toggleDone = async payload => {
  const { id } = payload.task;
  const task = await taskApi.toggleDone(id).then(task => task);
  updateItemsList(task);
};
const taskDelete = task => {
  items.value = items.value.filter(item => item.id !== task.id);
};
const updateOrder = ({ value }) => {
  const item = orderBy.list[value];
  const params = {
    orderBy: item.value
  };
  fetchItems(params);
};
const updateAccount = account => {
  const params = { accountId: account.id };
  emit('account:choose', account);
  fetchItems(params);
};

onMounted(() => {
  fetchItems();
});
</script>
<style lang="scss" scoped>
.main-container {
  max-width: 82rem;
  font-family: 'Roboto', sans-serif;
}
</style>
