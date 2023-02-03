<template>
  <ul :class="className">
    <li
      v-for="item in items"
      :key="item.id"
      class="mt-4 list-item">
      <Transition duration="500" name="nested">
        <TaskItem
          @toggle:task="$emit('toggle:task', $event)"
          @task:edit="$emit('task:edit', $event)"
          :item="item"
          :show-description="showDescription"
          :show-created-at="showCreatedAt" />
      </Transition>
    </li>
  </ul>
</template>

<script setup>
// TODO: test a11y for removal and addition of items in lists
import TaskItem from './TaskItem.vue';

const props = defineProps({
  items: { type: Array, required: true },
  showDescription: { type: Boolean, required: true },
  showCreatedAt: { type: Boolean, require: true }
});

const className = props.doneList ? 'done-tasks' : 'pending-tasks';
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
