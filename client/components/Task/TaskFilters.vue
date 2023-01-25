<template>
  <div class="task-filters mt-2 mb-4 flex">
    <div
      v-for="filter in filters"
      :key="filter"
      class="field-checkbox ml-8">
      <Checkbox
        v-model="checked"
        @change="$emit('filters:update', checked)"
        :value="filter"
        :input-id="`order-by-${filter}`"
        :name="`order-by-${filter}`" />
      <label for="`order-by-${filter}`">Order by: <b>{{ filter }}</b></label>
    </div>
  </div>
</template>

<script setup>
import Checkbox from 'primevue/checkbox';
import { ref } from 'vue';

defineProps({
  filters: { type: Array, required: true }
});

const checked = ref([]);
</script>
