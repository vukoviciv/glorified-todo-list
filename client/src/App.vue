<template>
  <Header />
  <main class="p-5">
    <CreateTaskDialog />
    <Tasks />
  </main>
</template>

<script setup>
import Tasks from './../components/Tasks.vue';
import Header from './../components/Header.vue';
import CreateTaskDialog from '../components/CreateTaskDialog.vue';
</script>
