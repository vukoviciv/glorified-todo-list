<template>
  <ul>
    <li
      v-for="item in items"
      :key="item.id"
      class="mt-4 list-item">
      <div class="field-checkbox">
        <Checkbox v-model="item.done" :input-id="item.id" :binary="true" />
        <label :for="item.id">{{ item.name }}</label>
      </div>
      <p>{{ item.description }}</p>
    </li>
  </ul>
</template>

<script setup>
import Checkbox from 'primevue/Checkbox';

defineProps({
  items: { type: Array, required: true }
});
</script>

<style lang="scss" scoped>
.list-item {
  background-color: #f2f2f2;
}
</style>
