<template>
  <main class="main-container p-5 m-auto">
    <TasksMain
      @toggle:task="toggleDone"
      @task:delete="taskDelete($event)"
      @update:order="updateOrder"
      @task:created="taskCreated()"
      :items="items"
      :is-fetching="isFetching" />
    <AccountsDialog
      v-if="showDialog"
      @account:switch="$emit('account:switch', $event)"
      :user="user" />
  </main>
</template>

<script setup>
import { computed, ref } from 'vue';
import AccountsDialog from './AccountsDialog.vue';
import { orderBy } from '@/config/task';
import taskApi from '@/src/api/tasks';
import TasksMain from './Task/index.vue';

const props = defineProps({
  user: { type: Object, required: true },
  activeAccount: { type: Object, default: () => ({}) },
  tasks: { type: Array, default: () => ([]) },
  isFetching: { type: Boolean, required: true }
});
const emit = defineEmits(['account:switch', 'fetch']);
const items = ref(props.tasks);
const showDialog = computed(() => !props.activeAccount);

const updateItemsList = task => {
  items.value = items.value.map(item => (item.id === task.id ? task : item));
};
const toggleDone = async payload => {
  const { id } = payload.task;
  const task = await taskApi
    .toggleDone(id)
    .then(task => task);
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
