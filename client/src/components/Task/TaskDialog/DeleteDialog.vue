<template>
  <div>
    <Button
      @click="showDialog"
      :icon="PrimeIcons.TRASH"
      class="p-button-rounded p-button-outlined ml-3"
      title="Delete task"
      aria-label="Delete task" />
    <ConfirmDialog :group="dialogId">
      <template #message="slotProps">
        <span :class="slotProps.message.icon"></span>
        <p class="p-3">
          {{ slotProps.message.message }}
        </p>
      </template>
    </ConfirmDialog>
  </div>
</template>

<script setup>
import Button from 'primevue/Button';
import ConfirmDialog from 'primevue/confirmdialog';
import { PrimeIcons } from 'primevue/api';
import { ref } from 'vue';
import { types } from '@/config/snackbar.js';
import { useConfirm } from 'primevue/useconfirm';
import { useSnackbar } from '../../composables/snackbar';
import { useStore } from 'vuex';

const props = defineProps({
  task: { type: Object, required: true }
});

const confirm = useConfirm();
const dialogId = ref(`${props.task.id}-confirm`);
const store = useStore();
const { showSnackbar } = useSnackbar();

const showDialog = () => {
  confirm.require({
    group: dialogId.value,
    header: `Delete task - ${props.task.name}`,
    message: 'Deleting task is irreversible action. Are you sure you want to proceed?',
    icon: PrimeIcons.EXCLAMATION_TRIANGLE,
    acceptIcon: PrimeIcons.TRASH,
    acceptLabel: 'Delete task',
    rejectIcon: PrimeIcons.TIMES,
    rejectLabel: 'Cancel',
    accept: () => {
      store.dispatch('deleteTask', props.task.id)
        .then(() => {
          showSnackbar('Task deleted!', types.SUCCESS);
        }).catch(error => {
          const text = error.response.data;
          showSnackbar(text, types.ERROR);
        });
    }
  });
};
</script>
