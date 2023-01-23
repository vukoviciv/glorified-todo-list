<template>
  <MainHeader />
  <main class="main-container p-5 m-auto">
    <CreateTaskDialog />
    <Suspense>
      <template #default>
        <TasksTabView />
      </template>
      <template #fallback>
        <TasksSkeleton />
      </template>
    </Suspense>
  </main>
</template>

<script setup>
import CreateTaskDialog from '../components/CreateTaskDialog.vue';
import MainHeader from '../components/MainHeader.vue';
import TasksSkeleton from '../components/TasksSkeleton.vue';
import TasksTabView from '../components/Task/TasksTabView.vue';
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 82rem;
}
</style>
