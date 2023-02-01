<template>
  <main class="main-container p-5 m-auto">
    <CreateTaskDialog />
    <RouterView />
  </main>
</template>

<script setup>
import CreateTaskDialog from './Task/TaskDialog/CreateTaskDialog.vue';
</script>
<style lang="scss" scoped>
.main-container {
  max-width: 82rem;
}
</style>
