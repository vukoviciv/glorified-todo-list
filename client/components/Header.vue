<script setup>
const today = new Date();
const date = today.getDate();
const day = today.getDay();
</script>

<template>
  <header class="main-header">
    <p>{{ day }}</p>
    <Button @click="onClick">test</Button>
  </header>
</template>

<style lang="scss" scoped>
.main-header {
  background: var(--primary-700);
}
</style>