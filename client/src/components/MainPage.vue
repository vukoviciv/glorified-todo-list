<template>
  <main class="main-container p-5 m-auto">
    <TasksMain
      @update:order="updateOrder" />
  </main>
</template>

<script setup>
import { orderBy } from '@/config/task';
import TasksMain from './Task/index.vue';

const emit = defineEmits(['account:switch', 'fetch']);

const updateOrder = ({ value }) => {
  const item = orderBy.list[value];
  const params = {
    orderBy: item.value
  };
  emit('fetch', params);
};
</script>
<style lang="scss" scoped>
.main-container {
  max-width: 82rem;
  font-family: 'Roboto', sans-serif;
}
</style>
