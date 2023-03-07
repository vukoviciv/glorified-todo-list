<template>
  <ul>
    <li v-for="item in items" :key="item.id" class="my-2">
      <TaskItem :item="item" v-bind="options" />
    </li>
  </ul>
</template>

<script setup>
import TaskItem from './TaskItem.vue';

defineProps({
  items: { type: Array, required: true },
  options: { type: Object, required: true }
});
</script>
