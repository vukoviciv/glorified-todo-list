<template>
  <div>
    <TaskFilters
      @update:options="updateOptions"
      v-bind="options" />
    <TaskList
      :items="inProgressTasks"
      :options="options"
      aria-label="Pending tasks for today" />
    <Divider v-if="doneTasks.length" align="center">
      <span id="done-badge" class="p-tag">Done</span>
    </Divider>
    <TaskList
      :items="doneTasks"
      :options="options"
      aria-labelledby="done-badge" />
    <div v-if="!hasTasks" class="text-center">
      No tasks available for this account.
      <br>Click on 'Create new task' to create your first task!
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import Divider from 'primevue/Divider';
import TaskFilters from './TaskFilters.vue';
import TaskList from './TaskList.vue';
import { useStore } from 'vuex';

const store = useStore();

const options = ref({
  showDescription: true,
  showCreatedAt: false
});

const doneTasks = computed(() => store.getters.getDoneTasks);
const inProgressTasks = computed(() => store.getters.getPendingTasks);
const hasTasks = computed(() => store.state.tasks.length);

const updateOptions = payload => {
  Object.assign(options.value, payload);
};
</script>
<script>
export default { name: 'today-tasks' };
</script>
