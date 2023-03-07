<template>
  <RouterLink custom :to="to" v-slot="{ href, isActive }">
    <a
      v-bind="$attrs"
      :href="href"
      :aria-current="isActive"
      :class="{ active : isActive}">
      {{ label }}
    </a>
  </RouterLink>
</template>

<script setup>
defineProps({
  to: { type: Object, required: true },
  label: { type: String, required: true }
});
</script>
<script>
export default {
  inheritAttrs: false
};
</script>
