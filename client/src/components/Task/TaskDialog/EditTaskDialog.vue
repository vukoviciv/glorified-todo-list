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
const props = defineProps({
  task: { type: Object, required: true }
});
const showDialog = ref(false);
const store = useStore();
const { showSnackbar } = useSnackbar();

const activatorId = computed(() => `form-activator-${props.task.id}`);

const close = () => { showDialog.value = false; };
const open = () => { showDialog.value = true; };
const updateTask = task => {
  store.dispatch('updateTask', task)
    .then(() => {
      showSnackbar('Task edited!', types.SUCCESS);
    })
    .catch(error => {
      const text = error.response.data || DEFAULT_ERROR_MSG;
      showSnackbar(text, types.ERROR);
    }).finally(() => close());
};
</script>
