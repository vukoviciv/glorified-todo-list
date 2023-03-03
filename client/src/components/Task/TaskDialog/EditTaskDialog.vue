<template>
  <TaskDialog
    @close="close"
    @action:emit="updateTask"
    action-type="update"
    :initial-task="task"
    :show-dialog="showDialog"
    :activator-id="activatorId">
    <template #activator>
      <Button
        @click="open"
        :id="activatorId"
        :icon="PrimeIcons.PENCIL"
        class="p-button-rounded p-button-outlined ml-3"
        title="Edit task"
        aria-label="Edit task" />
    </template>
  </TaskDialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import Button from 'primevue/Button';
import { PrimeIcons } from 'primevue/api';
import TaskDialog from './common/TaskDialogForm.vue';
import { types } from '@/config/snackbar';
import { useSnackbar } from '../../composables/snackbar';
import { useStore } from 'vuex';

const DEFAULT_ERROR_MSG = 'Something went wrong';
const getInitialTask = () => Object.assign({}, props.initialTask);
const props = defineProps({
  initialTask: { type: Object, required: true }
});
const showDialog = ref(false);
const task = ref(getInitialTask());
const store = useStore();
const { showSnackbar } = useSnackbar();

const activatorId = computed(() => `form-activator-${task.value.id}`);

const close = () => {
  showDialog.value = false;
  task.value = getInitialTask();
};
const open = () => { showDialog.value = true; };
const updateTask = () => {
  store.dispatch('updateTask', task.value)
    .then(() => {
      showSnackbar('Task edited!', types.SUCCESS);
    })
    .catch(error => {
      const text = error.response.data || DEFAULT_ERROR_MSG;
      showSnackbar(text, types.ERROR);
    }).finally(() => close());
};
</script>
