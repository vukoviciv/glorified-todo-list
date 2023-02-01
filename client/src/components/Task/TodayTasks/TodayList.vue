<template>
  <div>
    <TaskFilters
      @update:options="updateOptions"
      @update:order="updateOrder"
      :order-by-values="orderByValues"
      :show-description="showDescription"
      :show-created-at="showCreatedAt" />
    <TaskList
      @toggle:task="toggleDone"
      :is-fetching="isFetching"
      :items="items"
      :show-description="showDescription"
      :show-created-at="showCreatedAt"
      aria-label="Pending tasks for today" />
    <Divider align="center">
      <span id="done-badge" class="p-tag">Done</span>
    </Divider>
    <TaskList
      @toggle:task="toggleDone"
      :items="items"
      :show-description="showDescription"
      :show-created-at="showCreatedAt"
      aria-labelledby="done-badge"
      are-done />
  </div>
</template>

<script>
import Divider from 'primevue/Divider';
import { orderBy } from '@/config/task';
import { ref } from 'vue';
import taskApi from '@/src/api/tasks';
import TaskFilters from '../TaskFilters.vue';
import TaskList from './TaskList.vue';

export default {
  async setup() {
    const items = ref([]);
    const isFetching = ref(true);
    const showDescription = ref(true);
    const showCreatedAt = ref(false);
    const orderByValues = orderBy.list.map(({ label, value }) => ({ name: label, value }));
    await taskApi.fetch()
      .then(tasks => {
        items.value = tasks;
        isFetching.value = false;
      });

    return {
      items,
      isFetching,
      orderByValues,
      showCreatedAt,
      showDescription
    };
  },
  methods: {
    async toggleDone(payload) {
      const { id } = payload.task;
      this.isFetching = true;
      const updatedTask = await taskApi.toggleDone(id).then(task => task);
      this.items = this.updateItemsList(updatedTask);
      this.isFetching = false;
    },
    updateOptions(payload) {
      Object.assign(this, payload);
    },
    updateOrder({ value }) {
      const { PRIORITY } = orderBy.values;
      let order = 'ASC';
      if (value === PRIORITY.value) order = 'DESC';
      const params = {
        orderBy: { [value]: order }
      };
      this.fetchItems(params);
    },
    updateItemsList(task) {
      return this.items.map(item => item.id === task.id ? task : item);
    },
    async fetchItems(params) {
      this.isFetching = true;
      await taskApi.fetch(params)
        .then(tasks => {
          this.items = tasks;
          this.isFetching = false;
        });
    }
  },
  components: {
    Divider,
    TaskFilters,
    TaskList
  }
};
</script>
