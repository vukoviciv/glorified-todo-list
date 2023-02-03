<template>
  <div>
    <TaskFilters
      @update:options="updateOptions"
      @update:order="updateOrder"
      :order-by-values="orderByValues"
      v-bind="options" />
    <TaskList
      @toggle:task="toggleDone"
      @task:edit="updateItemsList($event)"
      :items="inProgressTasks"
      :options="options"
      aria-label="Pending tasks for today" />
    <Divider align="center">
      <span id="done-badge" class="p-tag">Done</span>
    </Divider>
    <TaskList
      @toggle:task="toggleDone"
      @task:edit="updateItemsList($event)"
      :items="doneTasks"
      :options="options"
      aria-labelledby="done-badge" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import Divider from 'primevue/Divider';
import { orderBy } from '@/config/task';
import taskApi from '@/src/api/tasks';
import TaskFilters from './TaskFilters.vue';
import TaskList from './TaskList.vue';

const DEFAULT_ORDER = 'ASC';
const props = defineProps({
  newTaskCreated: { type: Boolean, required: true }
});
const items = ref([]);
const options = ref({
  showDescription: true,
  showCreatedAt: false
});

const orderByValues = orderBy.list.map(({ label, value }) => ({ name: label, value }));

const doneTasks = computed(() => items.value.filter(it => it.done));
const inProgressTasks = computed(() => items.value.filter(it => !it.done));

const toggleDone = async payload => {
  const { id } = payload.task;
  const updatedTask = await taskApi.toggleDone(id).then(task => task);
  updateItemsList(updatedTask);
};

const updateItemsList = task => {
  items.value = items.value.map(item => {
    return item.id === task.id ? task : item;
  });
};

const updateOrder = ({ value }) => {
  const { PRIORITY } = orderBy.values;
  const order = value === PRIORITY.value ? 'DESC' : DEFAULT_ORDER;
  const params = {
    orderBy: { [value]: order }
  };
  fetchItems(params);
};

const updateOptions = payload => {
  Object.assign(options.value, payload);
};

const fetchItems = async (params = {}) => {
  await taskApi.fetch(params)
    .then(tasks => {
      items.value = tasks;
    });
};
watch(
  () => props.newTaskCreated,
  val => {
    if (val) fetchItems();
  });

onMounted(() => fetchItems());
</script>
<script>
export default { name: 'today-tasks' };
</script>
