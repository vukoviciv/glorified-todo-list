<template>
  <div class="task-filters mt-2 mb-4 flex flex-wrap">
    <Dropdown
      v-model="selectedOrderBy"
      @change="$emit('update:order', $event)"
      :options="orderByValues"
      option-label="name"
      option-value="value"
      placeholder="Order by" />
    <div class="field-checkbox ml-8">
      <Checkbox
        @input="$emit('update:options', { showDescription: $event })"
        :model-value="showDescription"
        input-id="show-description"
        binary />
      <label for="show-description">Show <b>description</b></label>
    </div>
    <div class="field-checkbox ml-8">
      <Checkbox
        @input="$emit('update:options', { showCreatedAt: $event })"
        :model-value="showCreatedAt"
        input-id="show-created-at"
        binary />
      <label for="show-created-at">Show <b>created at</b></label>
    </div>
  </div>
</template>

<script setup>
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import { ref } from 'vue';

defineProps({
  orderByValues: { type: Array, required: true },
  showDescription: { type: Boolean, required: true },
  showCreatedAt: { type: Boolean, require: true }
});

const selectedOrderBy = ref();
</script>
