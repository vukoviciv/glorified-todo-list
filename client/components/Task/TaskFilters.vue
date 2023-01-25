<template>
  <div class="task-filters mt-2 mb-4 flex flex-wrap">
    <Dropdown
      v-model="selectedOrderBy"
      :options="orderByValues"
      input-id="test-input-id"
      option-label="name"
      option-value="value"
      placeholder="Order by" />
    <div class="field-checkbox ml-8">
      <Checkbox
        v-model="showDescription"
        @input="$emit('options:update', { showDescription: $event})"
        input-id="show-description"
        :binary="true" />
      <label for="show-description">Show <b>description</b></label>
    </div>
    <div class="field-checkbox ml-8">
      <Checkbox
        v-model="showCreatedAt"
        @input="$emit('options:update', { showCreatedAt: $event })"
        input-id="show-created-at"
        :binary="true" />
      <label for="show-created-at">Show <b>created at</b></label>
    </div>
  </div>
</template>

<script setup>
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import { ref } from 'vue';

const props = defineProps({
  orderByValues: { type: Array, required: true },
  showDescription: { type: Boolean, required: true },
  showCreatedAt: { type: Boolean, require: true }
});

const selectedOrderBy = ref();
const showDescription = ref(props.showDescription);
const showCreatedAt = ref(props.showCreatedAt);
</script>
