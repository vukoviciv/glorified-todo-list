<template>
  <div class="grid main-container m-auto">
    <span id="main-page"></span>
    <div class="col-12 p-0 lg:col-2">
      <MainNavigation class="sm:p-0" />
      <CreateTaskDialog class="w-full mt-2" />
    </div>
    <main class="lg:col-10 m-auto">
      <div>
        <RouterView />
      </div>
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
