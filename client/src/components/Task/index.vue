<template>
  <CreateTaskDialog @task:created="handleTaskCreate" />
  <TabMenu :model="menuItems" class="flex-grow-1 justify-space-around" />
  <RouterView :new-task-created="newTaskCreated" />
</template>

<script setup>
import CreateTaskDialog from './TaskDialog/CreateTaskDialog.vue';
import { ref } from 'vue';
import TabMenu from 'primevue/tabmenu';

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
