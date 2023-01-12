<template>
  <div class="field-checkbox">
    <Checkbox
      v-model="task.done"
      @input="$emit('update:task', $event, task)"
      :input-id="task.id"
      :binary="true" />
    <label :for="task.id">{{ task.name }}</label>
  </div>
  <p>{{ task.description }}</p>
</template>

<script setup>
import Checkbox from 'primevue/checkbox';
import { ref } from 'vue';

const props = defineProps({
  item: { type: Object, required: true }
});

const task = ref(props.item);
</script>
