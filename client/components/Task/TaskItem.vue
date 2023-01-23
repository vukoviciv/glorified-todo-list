<template>
  <div class="task-item flex align-items-center">
    <TdIcon :icon="config.icon" :class="`mr-3 ${config.className}`" />
    <div
      class="flex flex-grow-1 p-3"
      :class="!item.done ? config.className : 'grey'">
      <Checkbox
        v-model="isDone"
        @input="$emit('update:task', { isDone: $event, task: item })"
        :input-id="item.id.toString()"
        :input-props="inputProps"
        :binary="true" />
      <div class="ml-3">
        <label :for="item.id">{{ item.name }}</label>
        <p
          v-if="showDescription"
          :id="`task-description-${item.id}`"
          class="mt-2">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Checkbox from 'primevue/checkbox';
import { PrimeIcons } from 'primevue/api';
import { priority } from '../../config/task';
import { ref } from 'vue';
import TdIcon from './../common/TdIcon.vue';

const { HIGH, MEDIUM, LOW } = priority;

const priorityConfig = {
  [HIGH]: {
    className: 'red',
    icon: PrimeIcons.ANGLE_DOUBLE_UP
  },
  [MEDIUM]: {
    className: 'yellow',
    icon: PrimeIcons.ANGLE_DOUBLE_RIGHT
  },
  [LOW]: {
    className: 'green',
    icon: PrimeIcons.ANGLE_DOUBLE_DOWN
  }
};

const props = defineProps({
  item: { type: Object, required: true },
  done: { type: Boolean, required: true },
  showDescription: { type: Boolean, default: true }
});

const isDone = ref(props.done);
const inputProps = { 'aria-describedby': 'task-description' };
const config = priorityConfig[props.item.priority];
</script>

<style lang="scss">
@mixin iconStyle($color) {
  background: transparent;
  color: var($color);
  font-size: 1.3rem;
}

.task-item {
  .red {
    background: var(--red-100);
    &.pi {
      @include iconStyle(--red-500);
    }
  }
  .yellow {
    background: var(--yellow-100);

    &.pi {
      @include iconStyle(--yellow-500);
    }
  }
  .green {
    background: var(--green-100);
    &.pi {
      @include iconStyle(--green-500);
    }
  }
  .grey {
    background: var(--gray-100);
  }
}
</style>
