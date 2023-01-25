<template>
  <div>
    <TaskFilters @filters:update="filtersUpdate" :filters="filters" />
    <TaskSkeleton v-if="isFetching" />
    <TaskList
      v-else
      @update:task="toggleTask"
      :is-fetching="isFetching"
      :items="items"
      aria-label="Pending tasks for today" />
    <Divider align="center">
      <span id="done-badge" class="p-tag">Done</span>
    </Divider>
    <TaskList
      @update:task="toggleTask"
      :items="items"
      aria-labelledby="done-badge"
      done-tasks />
  </div>
</template>

<script>
import Divider from 'primevue/Divider';
import { ref } from 'vue';
import taskApi from '@/src/api/tasks';
import TaskFilters from './TaskFilters.vue';
import TaskList from './TaskList.vue';
import TaskSkeleton from '../TasksSkeleton.vue';

export default {
  async setup() {
    const items = ref([]);
    const isFetching = ref(true);
    const filters = ['deadline', 'name'];

    await taskApi.fetch()
    .then(tasks => {
      items.value = tasks;
      isFetching.value = false;
    });

    return { items, filters, isFetching };
  },
  methods: {
    toggleTask({ task, isDone }) {
      task.done = isDone;
    },
    filtersUpdate(payload) {
      const orderByChecked = Object.values(payload);
      const orderBy = this.filters.reduce((acc, filter) => {
        const isChecked = orderByChecked.includes(filter);
        acc[filter] = isChecked ? 'ASC' : 'DESC';
        return acc;
      }, {});
      const params = { orderBy };

      return this.fetchItems(params);
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
    TaskList,
    TaskSkeleton
  }
};
</script>
