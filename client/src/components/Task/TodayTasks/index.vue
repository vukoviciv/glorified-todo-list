<template>
  <div>
    <TaskFilters
      @update:options="updateOptions"
      @update:order="$emit('update:order', $event)"
      v-bind="options" />
    <TasksSkeleton v-if="isFetching" />
    <TaskList
      v-else
      @toggle:task="$emit('toggle:task', $event)"
      @task:edit="$emit('task:edit', $event)"
      @task:delete="$emit('task:delete', $event)"
      :items="inProgressTasks"
      :options="options"
      aria-label="Pending tasks for today" />
    <Divider align="center">
      <span id="done-badge" class="p-tag">Done</span>
    </Divider>
    <TasksSkeleton v-if="isFetching" />
    <TaskList
      v-else
      @toggle:task="$emit('toggle:task', $event)"
      @task:edit="$emit('task:edit', $event)"
      @task:delete="$emit('task:delete', $event)"
      :items="doneTasks"
      :options="options"
      aria-labelledby="done-badge" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import Divider from 'primevue/Divider';
import TaskFilters from './TaskFilters.vue';
import TaskList from './TaskList.vue';
import TasksSkeleton from './TasksSkeleton.vue';

const props = defineProps({
  items: { type: Array, required: true },
  isFetching: { type: Boolean, required: true }
});

const options = ref({
  showDescription: true,
  showCreatedAt: false
});

const doneTasks = computed(() => props.items.filter(it => it.done));
const inProgressTasks = computed(() => props.items.filter(it => !it.done));

const updateOptions = payload => {
  Object.assign(options.value, payload);
};
</script>
<script>
export default { name: 'today-tasks' };
</script>
