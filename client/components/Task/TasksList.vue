<template>
  <ul aria-label="Pending tasks" class="pending-tasks">
    <li
      v-for="task in tasks"
      :key="task.id"
      class="mt-4 list-item">
      <Transition duration="500" name="nested">
        <TaskItem
          v-if="!task.done"
          @update:task="toggleTask"
          :item="task"
          :done="task.done" />
      </Transition>
    </li>
  </ul>
  <Divider align="center">
    <span id="done-badge" class="p-tag">Done</span>
  </Divider>
  <ul aria-labelledby="done-badge" class="done-tasks">
    <li
      v-for="task in tasks"
      :key="task.id"
      class="mt-4">
      <Transition duration="500" name="nested">
        <TaskItem
          v-if="task.done"
          @update:task="toggleTask"
          :item="task"
          :done="task.done" />
      </Transition>
    </li>
  </ul>
</template>

<script setup>
import Divider from 'primevue/Divider';
import { ref } from 'vue';
import TaskItem from './TaskItem.vue';

const props = defineProps({
  items: { type: Array, required: true }
});

const tasks = ref(props.items);

const toggleTask = ($event, task) => {
  task.done = $event;
};
</script>

<style lang="scss" scoped>
@mixin transition($y: 20px) {
  .nested-enter-active, .nested-leave-active {
  transition: all 0.3s ease-in-out;
  }
  /* delay leave of parent element */
  .nested-leave-active {
    transition-delay: 0.25s;
  }

  .nested-enter-from,
  .nested-leave-to {
    transform: translateY($y);
    opacity: 0;
  }
}

.pending-tasks {
  @include transition;
}

.done-tasks {
  @include transition(-20px);
}
</style>
