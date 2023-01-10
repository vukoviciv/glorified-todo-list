<script setup>
import Header from './../components/Header.vue';
import Panel from 'primevue/panel';
</script>

<template>
  <Header />
  <h1>Hello App</h1>
  <Panel>
    <template #header>
      <i class="pi pi-spin pi-heart-fill"></i>
      <h2>Panel Header</h2>
    </template>
    <p>Lorem ipsum</p>
  </Panel>
</template>
