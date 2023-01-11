<template>
  <TabView class="mt-5">
    <TabPanel
      v-for="tab in tabs"
      :key="tab.title"
      :header="tab.title"
      headerClass="tab-header flex-grow-1 justify-space-around">
      <p>{{ tab.content }}</p>
    </TabPanel>
  </TabView>
</template>

<script setup>
import { ref } from 'vue';
import TabPanel from 'primevue/TabPanel';
import TabView from 'primevue/TabView';

const defaultText = `At vero eos et accusamus et iusto odio dignissimos ducimus qui
    blanditiis praesentium voluptatum deleniti atque corrupti quos
    dolores et quas molestias excepturi sint occaecati cupiditate non
    provident, similique sunt in culpa qui officia deserunt mollitia
    animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
    est et expedita distinctio. Nam libero tempore, cum soluta nobis est
    eligendi optio cumque nihil impedit quo minus.`;

const tabs = ref([{
  title: 'Today',
  content: defaultText
}, {
  title: 'Week',
  content: defaultText
}, {
  title: 'Month',
  content: defaultText
}, {
  title: 'All',
  content: defaultText
}]);

</script>

<style lang="scss" scoped>
:deep(.p-tabview-nav-link) {
  display: block;
  text-align: center;
}
</style>
