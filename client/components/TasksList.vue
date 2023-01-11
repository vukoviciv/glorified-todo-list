<template>
  <ul role="list">
    <li>
      <div class="field-checkbox">
        <Checkbox v-model="checked" input-id="binary" :binary="true" />
        <label for="binary">{{ checked }}</label>
      </div>
    </li>
  </ul>
</template>

<script setup>
import Checkbox from 'primevue/checkbox';
import { ref } from 'vue';

defineProps({
  foo: String
});

const checked = ref(false);
</script>
