<template>
  <header class="main-header">
    <div class="card-container grid flex align-items-center justify-content-between">
      <p class="md:col-4 col-12">{{ today }}</p>
      <h1 class="md:col-4 col-12 text-center">
        <slot name="heading">My Glorified TODO list</slot>
      </h1>
      <div class="md:col-4 col-12 text-right">
        <slot name="options"></slot>
      </div>
    </div>
  </header>
</template>

<script setup>
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const today = new Date().toLocaleDateString(undefined, options);
</script>

<style lang="scss" scoped>
.main-header {
  padding: var(--content-padding);
  background: var(--primary-700);
  font-family: var(--font-family);
  color: white;
}
</style>
