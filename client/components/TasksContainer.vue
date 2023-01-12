<template>
  <TabView class="mt-5">
    <TabPanel
      v-for="tab in tabs"
      :key="tab.title"
      :header="tab.title"
      headerClass="tab-header flex-grow-1 justify-space-around">
      <component
        :is="tab.componentName"
        :items="tab.items" />
    </TabPanel>
  </TabView>
</template>

<script>
import { ref, shallowRef } from 'vue';
import TabPanel from 'primevue/TabPanel';
import TabView from 'primevue/TabView';
import tasksApi from '@/api/tasks';
import TasksList from './TasksList.vue';

export default {
  async setup() {
    const items = ref([]);
    await tasksApi.fetch().then(tasks => (items.value = tasks));

    const tabs = shallowRef([{
      title: 'Today',
      componentName: TasksList,
      items: items.value
    }]);

    return { tabs };
  },
  components: { TabPanel, TabView }
};
</script>

<style lang="scss" scoped>
:deep(.p-tabview-nav-link) {
  display: block;
  text-align: center;
}
</style>
