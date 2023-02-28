<template>
  <div class="relative">
    <div class="task-item flex align-items-center">
      <TdIcon
        :icon="config.icon"
        :class="`mr-3 ${config.className}`"
        :text="config.text" />
      <div
        class="flex flex-grow-1 p-3"
        :class="taskWrapperClass">
        <Checkbox
          v-model="isDone"
          @input="$emit('toggle:task', { task: item })"
          :input-id="item.id.toString()"
          :input-props="inputProps"
          binary />
        <div class="ml-3">
          <div>
            <label :for="item.id">{{ item.name }}</label>
            <p
              v-if="displayDescription"
              :id="`task-description-${item.id}`"
              class="mt-2">
              {{ item.description }}
            </p>
          </div>
          <p v-if="displayDeadline" class="ml-auto mt-2 flex">
            <b>Deadline</b>: {{ item.deadlineDate }} {{ item.deadlineTime }}
          </p>
        </div>
      </div>
      <EditTaskDialog :task="item" />
      <DeleteDialog
        @task:delete="$emit('task:delete', $event)"
        :task="item" />
    </div>
    <p v-if="showCreatedAt" class="ml-5 pl-1 pt-1">
      <i>Created: {{ processDate(item.createdAt) }}</i>
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import Checkbox from 'primevue/checkbox';
import DeleteDialog from '../TaskDialog/DeleteDialog.vue';
import EditTaskDialog from '../TaskDialog/EditTaskDialog.vue';
import { PrimeIcons } from 'primevue/api';
import { priority } from '@/config/task';
import TdIcon from '@/src/components/common/TdIcon.vue';

const { HIGH, MEDIUM, LOW } = priority.values;

const priorityConfig = {
  [HIGH.value]: {
    className: 'red',
    icon: PrimeIcons.ANGLE_DOUBLE_UP,
    text: `${HIGH.label} priority`
  },
  [MEDIUM.value]: {
    className: 'yellow',
    icon: PrimeIcons.ANGLE_DOUBLE_RIGHT,
    text: `${MEDIUM.label} priority`
  },
  [LOW.value]: {
    className: 'green',
    icon: PrimeIcons.ANGLE_DOUBLE_DOWN,
    text: `${LOW.label} priority`
  }
};

const props = defineProps({
  item: { type: Object, required: true },
  showDescription: { type: Boolean, required: true },
  showCreatedAt: { type: Boolean, require: true }
});

const isDone = ref(props.item.done);
const inputProps = { 'aria-describedby': 'task-description' };
const config = computed(() => priorityConfig[props.item.priority]);
const taskWrapperClass = computed(() => {
  return !props.item.done ? config.value.className : 'grey';
});
const displayDescription = computed(() => {
  return props.item.description && props.showDescription;
});
const displayDeadline = computed(() => {
  return props.item.deadlineDate && props.item.deadlineTime;
});

const processDate = dateTime => {
  const date = new Date(dateTime);

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
