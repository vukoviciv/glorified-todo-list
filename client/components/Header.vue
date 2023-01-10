<script setup>
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const today = new Date().toLocaleDateString(undefined, options);
</script>

<template>
  <header class="main-header">
    <div class="card-container flex align-items-center justify-content-between">
      <p>{{ today }}</p>
      <h1>Glorified TODO list</h1>
      <div class="flex">
        <span>Ivana Simic</span>
        <i class="pi pi-user ml-4"></i>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.main-header {
  font-family: var(--font-family);
  background: var(--primary-700);
  color: white;
  padding: 1rem;
}
</style>