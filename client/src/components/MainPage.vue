<template>
  <main class="main-container p-5 m-auto">
    <TasksMain
      @toggle:task="toggleDone"
      @task:edit="updateItemsList($event)"
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
import { computed, inject, ref } from 'vue';
import AccountsDialog from './AccountsDialog.vue';
import { orderBy } from '@/config/task';
import { snackbarConfig } from '../../config/snackbar';
import taskApi from '@/src/api/tasks';
import TasksMain from './Task/index.vue';

const props = defineProps({
  user: { type: Object, required: true },
  activeAccount: { type: Object, default: () => ({}) },
  tasks: { type: Array, default: () => ([]) },
  isFetching: { type: Boolean, required: true }
});
const emit = defineEmits(['account:switch', 'fetch']);
let snackbar = inject('snackbar');

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
const showSnackbar = () => {
  const config = {
    text: 'Task has been successfully created!',
    isActive: true,
    ...snackbarConfig.success
  };
  snackbar = Object.assign(snackbar, config);
};
const taskCreated = () => {
  emit('fetch');
  showSnackbar();
};
</script>
<style lang="scss" scoped>
.main-container {
  max-width: 82rem;
  font-family: 'Roboto', sans-serif;
}
</style>
