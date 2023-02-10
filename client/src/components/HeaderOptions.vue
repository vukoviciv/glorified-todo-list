<template>
  <div>
    <div class="user-menu-wrapper flex align-items-center justify-content-end">
      <span>{{ user.fullName }}</span>
      <span v-if="activeAccount" class="ml-2">| {{ activeAccount.name }}</span>
      <Button
        ref="activatorEl"
        @click="toggle"
        :icon="PrimeIcons.USER"
        class="p-button-rounded p-button-secondary ml-4"
        aria-haspopup="true"
        aria-controls="overlay_menu" />
    </div>
    <Menu
      ref="menu"
      id="overlay_menu"
      :model="items"
      :popup="true" />
    <ConfirmDialog>
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
import { computed, ref } from 'vue';
import Button from 'primevue/Button';
import ConfirmDialog from 'primevue/confirmdialog';
import Menu from 'primevue/Menu';
import { PrimeIcons } from 'primevue/api';
import { routes } from '@/shared/utils/navigation';
import { useConfirm } from 'primevue/useconfirm';

const props = defineProps({
  user: { type: Object, required: true },
  activeAccount: { type: Object, default: () => ({}) }
});
const emit = defineEmits(['account:switch']);
const confirm = useConfirm();
const activatorEl = ref(null);
const menu = ref();
const accounts = computed(() => {
  return props.user.accounts.map(account => {
    return {
      id: account.id,
      label: account.name,
      command: () => { emit('account:switch', account); }
    };
  });
});
const items = ref([{
  label: 'User',
  items: [{
    label: 'Profile',
    icon: PrimeIcons.USER
  }, {
    label: 'Logout',
    icon: PrimeIcons.SIGN_OUT,
    command: () => { logout(); }
  }]
}, {
  label: 'Accounts',
  items: accounts
}]);

const toggle = event => menu.value.toggle(event);
const focusActivator = () => activatorEl.value.$el.focus();
const logout = () => {
  confirm.require({
    message: 'Are you sure you logout?',
    header: 'Logout',
    acceptLabel: 'Logout',
    accept: () => {
      document.location.replace(routes.logout);
    },
    rejectLabel: 'Cancel',
    onHide: () => {
      focusActivator();
    },
    reject: () => {
      focusActivator();
    }
  });
};
</script>
