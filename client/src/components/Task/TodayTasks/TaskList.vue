<template>
  <ul>
    <li v-for="item in items" :key="item.id" class="list-item">
      <TaskItem :item="item" v-bind="options" />
    </li>
  </ul>
</template>

<script setup>
// TODO: test a11y for removal and addition of items in lists
import TaskItem from './TaskItem.vue';

defineProps({
  items: { type: Array, required: true },
  options: { type: Object, required: true }
});
</script>
