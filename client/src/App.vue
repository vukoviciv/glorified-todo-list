<template>
  <MainHeader />
  <main class="p-5 main-container">
    <CreateTaskDialog />
    <TasksContainer />
  </main>
</template>

<script setup>
import CreateTaskDialog from '../components/CreateTaskDialog.vue';
import MainHeader from './../components/MainHeader.vue';
import TasksContainer from '../components/TasksContainer.vue';
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 82rem;
  margin: auto;
}
</style>
