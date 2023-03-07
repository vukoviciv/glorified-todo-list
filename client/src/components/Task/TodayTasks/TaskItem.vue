<template>
  <div class="task-item flex align-items-center mx-2">
    <TdIcon
      :icon="config.icon"
      :class="`mr-3 ${config.className}`"
      :text="config.text" />
    <div
      class="flex flex-grow-1 p-3"
      :class="taskWrapperClass">
      <Checkbox
        v-model="isDone"
        @input="toggleDone()"
        :input-id="item.id.toString()"
        :input-props="inputProps"
        binary />
      <div class="ml-3">
        <div>
          <label :for="item.id">{{ item.name }}</label>
          <p
            v-if="displayDescription"
            :id="descriptionId"
            class="mt-2">
            {{ item.description }}
          </p>
        </div>
        <p v-if="displayDeadline" class="ml-auto mt-2 md:flex">
          <b>Deadline</b>: {{ item.deadlineDate }} {{ item.deadlineTime }}
        </p>
      </div>
    </div>
    <div class="md:flex">
      <EditTaskDialog :initial-task="item" />
      <DeleteDialog :task="item" class="mt-2 md:mt-0" />
    </div>
  </div>
  <p v-if="showCreatedAt" class="ml-5 pl-1 pt-1">
    <i>Created: {{ processDate(item.createdAt) }}</i>
  </p>
</template>

<script setup>
import { computed, ref } from 'vue';
import Checkbox from 'primevue/checkbox';
import DeleteDialog from '../TaskDialog/DeleteDialog.vue';
import EditTaskDialog from '../TaskDialog/EditTaskDialog.vue';
import { PrimeIcons } from 'primevue/api';
import { priority } from '@/config/task';
import TdIcon from '@/src/components/common/TdIcon.vue';
import { types } from '@/config/snackbar.js';
import { useSnackbar } from '../../composables/snackbar';
import { useStore } from 'vuex';

const DEFAULT_ERROR_MSG = 'Something went wrong';
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
const descriptionId = `task-description-${props.item.id}`;
const inputProps = { 'aria-describedby': descriptionId };
const store = useStore();
const { showSnackbar } = useSnackbar();

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
const toggleDone = () => {
  store.dispatch('toggleDone', props.item.id)
    .then(task => {
      const taskStatus = task.done ? 'done' : 'pending';
      showSnackbar(`Task ${props.item.name} moved to ${taskStatus} list`, types.SUCCESS);
    }).catch(error => {
      const text = error.response.data || DEFAULT_ERROR_MSG;
      showSnackbar(text, types.ERROR);
    });
};
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
