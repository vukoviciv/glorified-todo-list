<template>
  <div class="tasks-main">
    <CreateTaskDialog @task:created="$emit('task:created', $event)" />
    <TabMenu
      :model="menuItems"
      aria-label="Main navigation"
      class="flex-grow-1 justify-space-around" />
    <RouterView
      @update:order="$emit('update:order', $event)"
      :is-fetching="isFetching" />
  </div>
</template>

<script setup>
import CreateTaskDialog from './TaskDialog/CreateTaskDialog.vue';
import { onMounted } from 'vue';
import TabMenu from 'primevue/tabmenu';

defineProps({
  isFetching: { type: Boolean, required: true }
});
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
<script>
export default {
  name: 'tasks-main'
};
</script>

<style lang="scss" scoped>
::v-deep .p-tabmenu .p-tabmenu-nav .p-tabmenuitem { // TODO: ::v-deep usage as a combinator has been deprecated. Use :deep(<inner-selector>) instead.
  .p-menuitem-link {
    border: none;
  }
  &.p-highlight {
    border-bottom: 5px solid var(--primary-500);
  }
}
</style>
