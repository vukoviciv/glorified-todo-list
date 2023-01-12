<template>
  <ul aria-label="Pending tasks">
    <li
      v-for="item in pendingItems"
      :key="item.id"
      class="mt-4 list-item">
      <div class="field-checkbox">
        <Checkbox
          v-model="item.done"
          @input="toggleTask($event, item)"
          :input-id="item.id"
          :binary="true" />
        <label :for="item.id">{{ item.name }}</label>
      </div>
      <p>{{ item.description }}</p>
    </li>
  </ul>
  <Divider align="center">
    <span id="done-badge" class="p-tag">Done</span>
  </Divider>
  <ul aria-labelledby="done-badge">
    <li
      v-for="item in doneItems"
      :key="item.id">
      <div class="field-checkbox">
        <Checkbox
          v-model="item.done"
          @input="toggleTask($event, item)"
          :input-id="item.id"
          :binary="true" />
        <label :for="item.id">{{ item.name }}</label>
      </div>
      <p>{{ item.description }}</p>
    </li>
  </ul>
</template>

<script setup>
import Checkbox from 'primevue/checkbox';
import Divider from 'primevue/Divider';
import { ref } from 'vue';

const props = defineProps({
  items: { type: Array, required: true }
});

const pendingItems = ref(props.items.filter(it => !it.done));
const doneItems = ref(props.items.filter(it => it.done));

const moveToDone = task => {
  removeItemFromList(task, pendingItems);
  doneItems.value.push(task);
};

const moveToPending = task => {
  removeItemFromList(task, doneItems);
  pendingItems.value.push(task);
};

const toggleTask = ($event, task) => {
  task.done = $event;
  if ($event) moveToDone(task);
  else moveToPending(task);
};

function removeItemFromList(item, list) {
  list.value = list.value.filter(it => it.id !== item.id);
}
</script>

<style lang="scss" scoped>
.list-item {
  background-color: #f2f2f2;
}
</style>
