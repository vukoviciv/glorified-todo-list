<template>
  <main class="main-container p-5 m-auto">
    <CreateTaskDialog />
    <TabMenu
      :model="menuItems"
      aria-label="Main navigation"
      class="flex-grow-1 justify-space-around" />
    <RouterView />
  </main>
</template>

<script setup>
import CreateTaskDialog from './Task/TaskDialog/CreateTaskDialog.vue';
import { onMounted } from 'vue';
import TabMenu from 'primevue/tabmenu';

const menuItems = [
  { label: 'Today', to: '/today' },
  { label: 'Week', to: '/week' }
];

onMounted(() => {
  // a11y fix - Ensures elements with an ARIA role that require child roles contain them
  const unusedEl = document.querySelector('.p-tabmenu-ink-bar');
  unusedEl.remove();
});
</script>
<style lang="scss" scoped>
.main-container {
  max-width: 82rem;
  font-family: 'Roboto', sans-serif;
}
::v-deep .p-tabmenu .p-tabmenu-nav .p-tabmenuitem { // TODO: ::v-deep usage as a combinator has been deprecated. Use :deep(<inner-selector>) instead.
  .p-menuitem-link {
    border: none;
  }
  &.p-highlight {
    border-bottom: 5px solid var(--primary-500);
  }
}
</style>
