<template>
  <header class="main-header">
    <div class="card-container flex align-items-center justify-content-between">
      <p class="col-4 md:col-4">{{ today }}</p>
      <h1 class="col-7 md:col-4 text-center">
        <slot name="heading">
          My Glorified TODO list
        </slot>
      </h1>
      <div class="col-1 md:col-4 text-right">
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
