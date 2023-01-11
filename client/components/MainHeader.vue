<template>
  <header class="main-header">
    <div class="card-container flex align-items-center justify-content-between">
      <p>{{ today }}</p>
      <h1>My Glorified TODO list</h1>
      <div class="flex">
        <span>Ivana Šimić</span>
        <i class="pi pi-user ml-4"></i>
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
