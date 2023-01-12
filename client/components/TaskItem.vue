<template>
  <div class="flex mb-3 p-3">
    <Checkbox
      v-model="task.done"
      @input="$emit('update:task', $event, task)"
      :input-id="task.id"
      :input-props="{ 'aria-describedby': 'task-description' }"
      :binary="true" />
    <div class="ml-3">
      <label :for="task.id">{{ task.name }}</label>
      <p id="task-description" class="mt-2">{{ task.description }}</p>
    </div>
  </div>
</template>

<script setup>
import Checkbox from 'primevue/checkbox';
import { ref } from 'vue';

const props = defineProps({
  item: { type: Object, required: true }
});

const task = ref(props.item);
</script>
