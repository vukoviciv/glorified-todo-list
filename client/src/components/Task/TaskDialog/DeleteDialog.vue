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
import { inject, ref } from 'vue';
import Button from 'primevue/Button';
import ConfirmDialog from 'primevue/confirmdialog';
import { PrimeIcons } from 'primevue/api';
import { snackbarConfig } from '../../../../config/snackbar';
import { useConfirm } from 'primevue/useconfirm';
import { useStore } from 'vuex';

const props = defineProps({
  task: { type: Object, required: true }
});

const confirm = useConfirm();
const dialogId = ref(`${props.task.id}-confirm`);
let snackbar = inject('snackbar');
const store = useStore();

const showSnackbar = (text, type) => {
  const config = {
    ...snackbarConfig[type],
    text,
    isActive: true
  };
  snackbar = Object.assign(snackbar, config);
};

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
          showSnackbar('Task deleted!', 'success');
        }).catch(error => {
          const text = error.response.data;
          showSnackbar(text, 'error');
        });
    }
  });
};
</script>
