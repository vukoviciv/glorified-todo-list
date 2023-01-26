<template>
  <div class="relative mb-2">
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
          <div>
            <label :for="item.id">{{ item.name }}</label>
            <p v-if="showDescription" :id="`task-description-${item.id}`" class="mt-2">
              {{ item.description }}
            </p>
          </div>
          <p v-if="item.deadline" class="ml-auto mt-2 flex">
            <b>Deadline</b>: {{ processDate(item.deadline) }}
          </p>
        </div>
      </div>
      <Button
        :icon="PrimeIcons.PENCIL"
        class="p-button-rounded p-button-outlined ml-3"
        title="Edit task"
        aria-label="Edit task" />
    </div>
    <p v-if="showCreatedAt" class="ml-5 pl-1 pt-1">
      <i>Created: {{ processDate(item.createdAt) }}</i>
    </p>
  </div>
</template>

<script setup>
import Button from 'primevue/Button';
import Checkbox from 'primevue/checkbox';
import { PrimeIcons } from 'primevue/api';
import { priority } from '@/config/task';
import { ref } from 'vue';
import TdIcon from '@/components/common/TdIcon.vue';

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
  showDescription: { type: Boolean, required: true },
  showCreatedAt: { type: Boolean, require: true }
});

const isDone = ref(props.done);
const inputProps = { 'aria-describedby': 'task-description' };
const config = priorityConfig[props.item.priority];

const processDate = deadline => {
  const date = new Date(deadline);

  return date.toLocaleDateString();
};
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
