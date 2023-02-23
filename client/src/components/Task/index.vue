<template>
  <div class="tasks-main">
    <CreateTaskDialog @task:created="$emit('task:created', $event)" />
    <TabMenu :model="menuItems" class="flex-grow-1 justify-space-around" />
    <RouterView
      @toggle:task="$emit('toggle:task', $event)"
      @task:edit="$emit('task:edit', $event)"
      @task:delete="$emit('task:delete', $event)"
      @update:order="$emit('update:order', $event)"
      :items="items"
      :is-fetching="isFetching" />
  </div>
</template>

<script setup>
import CreateTaskDialog from './TaskDialog/CreateTaskDialog.vue';
import TabMenu from 'primevue/tabmenu';

defineProps({
  items: { type: Array, required: true },
  isFetching: { type: Boolean, required: true }
});

const menuItems = [
  { label: 'Today', to: '/today' }, // TODO: router name?
  { label: 'Week', to: '/week' }
];
</script>
<script>
export default {
  name: 'tasks-main'
};
</script>
