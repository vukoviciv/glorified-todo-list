<template>
  <div class="grid m-2">
    <nav class="col-2">
      <Menu
        :model="menuItems"
        aria-label="Main navigation"
        class="flex-grow-1 justify-space-around" />
    </nav>
    <main class="main-container col-10 grid">
      <RouterView class="col-10" />
      <CreateTaskDialog class="col-2" />
    </main>
  </div>
</template>

<script setup>
import CreateTaskDialog from './Task/TaskDialog/CreateTaskDialog.vue';
import Menu from 'primevue/Menu';

const menuItems = [
  { label: 'Today', to: '/today' },
  { label: 'Week', to: '/week' }
];
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
