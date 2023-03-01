<template>
  <div class="task-filters mt-2 mb-4 flex flex-wrap">
    <Dropdown
      v-model="selectedOrderBy"
      @change="updateOrder($event)"
      :options="orderByValues"
      option-label="label"
      option-value="key"
      placeholder="Order by" />
    <div class="field-checkbox ml-8">
      <Checkbox
        v-model="description"
        @input="$emit('update:options', { showDescription: $event })"
        input-id="show-description"
        binary />
      <label for="show-description">Show <b>description</b></label>
    </div>
    <div class="field-checkbox ml-8">
      <Checkbox
        v-model="createdAt"
        @input="$emit('update:options', { showCreatedAt: $event })"
        input-id="show-created-at"
        binary />
      <label for="show-created-at">Show <b>created at</b></label>
    </div>
  </div>
</template>

<script setup>
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import { orderBy } from '@/config/task';
import { ref } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  showDescription: { type: Boolean, required: true },
  showCreatedAt: { type: Boolean, require: true }
});

const selectedOrderBy = ref();
const description = ref(props.showDescription);
const createdAt = ref(props.showCreatedAt);
const store = useStore();

const orderByValues = orderBy.list.map((val, key) => ({ key, label: val.label }));
const updateOrder = ({ value }) => {
  store.dispatch('updateOrder', value);
};
</script>
