<template>
  <div>
    <TaskFilters
      @options:update="optionsUpdate"
      :order-by-values="orderByValues"
      :show-description="showDescription"
      :show-created-at="showCreatedAt" />
    <TaskSkeleton v-if="isFetching" />
    <TaskList
      v-else
      @update:task="toggleTask"
      :is-fetching="isFetching"
      :items="items"
      :show-description="showDescription"
      :show-created-at="showCreatedAt"
      aria-label="Pending tasks for today" />
    <Divider align="center">
      <span id="done-badge" class="p-tag">Done</span>
    </Divider>
    <TaskList
      @update:task="toggleTask"
      :items="items"
      :show-description="showDescription"
      :show-created-at="showCreatedAt"
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
    const showDescription = ref(true);
    const showCreatedAt = ref(false);
    const orderByValues = [
      { name: 'Deadline', value: 'deadline' },
      { name: 'Priority', value: 'priority' },
      { name: 'Name', value: 'name' },
      { name: 'Created at', value: 'createdAt' }
    ];

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
    toggleTask({ task, isDone }) {
      task.done = isDone;
    },
    optionsUpdate(payload) {
      Object.assign(this, payload);
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
