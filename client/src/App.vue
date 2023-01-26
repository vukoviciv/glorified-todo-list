<template>
  <MainHeader />
  <main class="main-container p-5 m-auto">
    <CreateTaskDialog />
    <TasksTabView />
  </main>
</template>

<script setup>
import CreateTaskDialog from '../components/Task/CreateTaskDialog.vue';
import MainHeader from '../components/MainHeader.vue';
import TasksTabView from '../components/Task/TasksTabView.vue';
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 82rem;
}
</style>
