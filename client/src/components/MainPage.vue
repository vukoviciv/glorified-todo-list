<template>
  <div class="grid">
    <MainNavigation class="col-2" />
    <main class="main-container col-10 grid">
      <div class="col-10">
        <RouterView />
      </div>
      <CreateTaskDialog class="col-2 mt-4" />
    </main>
  </div>
</template>

<script setup>
import CreateTaskDialog from './Task/TaskDialog/CreateTaskDialog.vue';
import MainNavigation from './MainNavigation.vue';
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 82rem;
  font-family: 'Roboto', sans-serif;
}
:deep(.p-tabmenu .p-tabmenu-nav .p-tabmenuitem) {
  .p-menuitem-link {
    border: none;
  }
  &.p-highlight {
    border-bottom: 5px solid var(--primary-500);
  }
}
</style>
