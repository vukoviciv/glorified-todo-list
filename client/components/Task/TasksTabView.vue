<template>
  <TabView class="mt-5">
    <TabPanel
      header="Today"
      headerClass="tab-header flex-grow-1 justify-space-around">
      <Suspense>
        <template #default>
          <TodayList />
        </template>
        <template #fallback>
          <TasksSkeleton />
        </template>
      </Suspense>
    </TabPanel>
  </TabView>
</template>

<script setup>
import TabPanel from 'primevue/TabPanel';
import TabView from 'primevue/TabView';
import TasksSkeleton from '../TasksSkeleton.vue';
import TodayList from './TodayList.vue';
</script>

<style lang="scss" scoped>
:deep(.p-tabview-nav-link) {
  display: block;
  text-align: center;
}
</style>
