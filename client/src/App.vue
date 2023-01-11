<template>
  <MainHeader />
  <main class="main-container p-5 m-auto">
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
}
</style>
