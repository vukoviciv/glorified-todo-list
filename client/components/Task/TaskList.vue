<template>
  <ul :class="className">
    <li
      v-for="item in items"
      :key="item.id"
      class="mt-3 list-item">
      <Transition duration="500" name="nested">
        <TaskItem
          v-if="doneTasks ? item.done : !item.done"
          @update:task="$emit('update:task', $event)"
          :item="item"
          :done="item.done" />
      </Transition>
    </li>
  </ul>
</template>

<script setup>
import TaskItem from './TaskItem.vue';

const props = defineProps({
  items: { type: Array, required: true },
  doneTasks: { type: Boolean, default: false }
});

const className = props.doneTasks ? 'done-tasks' : 'pending-tasks';
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
