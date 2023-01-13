<template>
  <div class="flex mb-3 p-3">
    <Checkbox
      v-model="isDone"
      @input="$emit('update:task', $event, task)"
      :input-id="task.id"
      :input-props="inputProps"
      :binary="true" />
    <div class="ml-3">
      <label :for="task.id">{{ task.name }}</label>
      <p
        v-if="showDescription"
        id="task-description"
        class="mt-2 pl-2">
        {{ task.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import Checkbox from 'primevue/checkbox';
import { ref } from 'vue';

const props = defineProps({
  item: { type: Object, required: true },
  done: { type: Boolean, required: true },
  showDescription: { type: Boolean, default: true }
});

const task = ref(props.item);
const isDone = ref(props.done);
const inputProps = { 'aria-describedby': 'task-description' };
</script>
