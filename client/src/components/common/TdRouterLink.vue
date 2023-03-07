<template>
  <RouterLink custom :to="to" v-slot="{ href, isActive }">
    <a :href="href" :aria-current="isActive">{{ label }}</a>
  </RouterLink>
</template>

<script setup>
defineProps({
  to: { type: Object, required: true },
  label: { type: String, required: true }
});
</script>
