<template>
  <CreateTaskDialog @task:created="handleTaskCreate" />
  <TabMenu :model="menuItems" />
  <Suspense>
    <template #default>
      <RouterView :new-task-created="newTaskCreated" />
    </template>
    <template #fallback>
      <TasksSkeleton />
    </template>
  </Suspense>
</template>

<script setup>
import CreateTaskDialog from './TaskDialog/CreateTaskDialog.vue';
import { ref } from 'vue';
import TabMenu from 'primevue/tabmenu';
import TasksSkeleton from './TodayTasks/TasksSkeleton.vue';

const menuItems = [
  { label: 'Today', to: '/today' }, // TODO: router name?
  { label: 'Week', to: '/week' }
];
const newTaskCreated = ref(false);
const handleTaskCreate = () => {
  newTaskCreated.value = true;
};
</script>
<script>
export default {
  name: 'tasks-main'
};
</script>

<style lang="scss" scoped>
:deep(.p-tabview-nav-link) {
  display: block;
  text-align: center;
}
</style>
