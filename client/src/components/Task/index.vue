<template>
  <div class="tasks-main">
    <CreateTaskDialog @task:created="$emit('task:created', $event)" />
    <TabMenu
      :model="menuItems"
      aria-label="Main navigation"
      class="flex-grow-1 justify-space-around" />
    <RouterView
      @toggle:task="$emit('toggle:task', $event)"
      @task:edit="$emit('task:edit', $event)"
      @task:delete="$emit('task:delete', $event)"
      @update:order="$emit('update:order', $event)"
      :items="items"
      :is-fetching="isFetching" />
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue';
import CreateTaskDialog from './TaskDialog/CreateTaskDialog.vue';
import TabMenu from 'primevue/tabmenu';

defineProps({
  items: { type: Array, required: true },
  isFetching: { type: Boolean, required: true }
});
const snackbar = inject('snackbar');
const menuItems = [
  { label: 'Today', to: '/today' },
  { label: 'Week', to: '/week' }
];

const setupSnackbar = () => {
  snackbar.title = 'Page loaded';
  snackbar.text = 'La la la la la la lorem ipsum';
  setTimeout(() => {
    snackbar.isActive = false;
  }, 5000);
};
onMounted(() => {
  // a11y fix - Ensures elements with an ARIA role that require child roles contain them
  const unusedEl = document.querySelector('.p-tabmenu-ink-bar');
  unusedEl.remove();
  setupSnackbar();
});
</script>
<script>
export default {
  name: 'tasks-main'
};
</script>

<style lang="scss" scoped>
::v-deep .p-tabmenu .p-tabmenu-nav .p-tabmenuitem {
  .p-menuitem-link {
    border: none;
  }
  &.p-highlight {
    border-bottom: 5px solid var(--primary-500);
  }
}
</style>
