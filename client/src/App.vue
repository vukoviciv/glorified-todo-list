<template>
  <Header />
  <main class="p-5 main-container">
    <CreateTaskDialog />
    <Tasks />
  </main>
</template>

<script setup>
import Tasks from './../components/Tasks.vue';
import Header from './../components/Header.vue';
import CreateTaskDialog from '../components/CreateTaskDialog.vue';
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 82rem;
  margin: auto;
}
</style>