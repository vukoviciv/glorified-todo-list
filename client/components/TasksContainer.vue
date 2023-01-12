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

<script setup>
import { faker } from '@faker-js/faker';
import { shallowRef } from 'vue';
import TabPanel from 'primevue/TabPanel';
import TabView from 'primevue/TabView';
import TasksList from './TasksList.vue';

function generateItems() {
  const items = [];
  for (let i = 0; i < 20; i++) {
    const item = {
      id: faker.datatype.uuid(),
      name: faker.music.songName(),
      description: faker.commerce.productDescription(),
      done: faker.datatype.boolean(),
      deadline: faker.date.future(),
      priority: 'high', // enums
      repeat: null, // TODO
      createdAt: faker.date.recent()
    };
    items.push(item);
  }
  return items;
}

const tabs = shallowRef([{
  title: 'Today',
  componentName: TasksList,
  items: generateItems()
}, {
  title: 'Week',
  componentName: TasksList,
  items: generateItems()
}, {
  title: 'Month',
  componentName: TasksList,
  items: generateItems()
}, {
  title: 'All',
  componentName: TasksList,
  items: generateItems()
}
]);
</script>

<style lang="scss" scoped>
:deep(.p-tabview-nav-link) {
  display: block;
  text-align: center;
}
</style>
