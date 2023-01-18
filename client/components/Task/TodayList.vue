<template>
  <div>
    <TaskList
      @update:task="toggleTask"
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

<script setup>
import Divider from 'primevue/Divider';
import TaskList from './TaskList.vue';

defineProps({
  items: { type: Array, required: true }
});

const toggleTask = ({ task, isDone }) => {
  task.done = isDone;
};
</script>
