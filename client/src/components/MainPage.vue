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
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { localStorageAccount } from './service/localStorage';
import { orderBy } from '@/config/task';
import taskApi from '@/src/api/tasks';
import TasksMain from './Task/index.vue';

const DEFAULT_ORDER = 'ASC';
const isFetching = ref(true);
const items = ref([]);

const newTaskCreated = ref(false);
const handleTaskCreate = () => {
  newTaskCreated.value = true;
};
// TODO: use export default and suspense/default on the parent component
const fetchItems = async (params = {}) => {
  isFetching.value = true;
  console.log('in fetch items, account: ', localStorageAccount.item);
  // todo: get account from localStorage
  await taskApi.fetch(params)
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
  const { PRIORITY } = orderBy.values;
  const order = value === PRIORITY.value ? 'DESC' : DEFAULT_ORDER;
  const params = {
    orderBy: { [value]: order }
  };
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
