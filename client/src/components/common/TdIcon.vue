<template>
  <span>
    <i v-bind="$attrs" aria-hidden="true" :class="icon"></i>
    <span v-if="text" class="p-sr-only">{{ text }}</span>
  </span>
</template>

<script>
export default {
  inheritAttrs: false
};
</script>
<script setup>
defineProps({
  icon: { type: String, required: true },
  text: { type: String, default: null }
});
</script>
