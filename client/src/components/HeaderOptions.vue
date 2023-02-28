<template>
  <div>
    <div class="flex justify-content-end">
      <div class="user-info hidden md:flex align-items-center ">
        <span>{{ user.fullName }}</span>
        <span class="ml-3 p-tag account-tag">{{ activeAccount.name }}</span>
      </div>
      <div class="ml-3">
        <Button
          ref="activatorEl"
          @click="toggle"
          :icon="PrimeIcons.USER"
          class="p-button-rounded p-button-secondary"
          aria-haspopup="true"
          aria-label="Account menu"
          aria-controls="overlay-menu" />
      </div>
    </div>
    <Menu
      ref="menu"
      id="overlay-menu"
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
import authApi from '@/auth/src/api/auth';
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
const createAccount = () => document.location.replace(routes.createAccount);
const getAccounts = () => {
  const accounts = props.user.accounts.map(account => {
    const icon = account.id === props.activeAccount?.id ? PrimeIcons.CHECK_CIRCLE : '';
    return {
      icon,
      id: account.id,
      label: account.name,
      command: () => { emit('account:switch', account); }
    };
  });
  return accounts;
};
const items = ref([{
  label: props.user.fullName,
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
  items: [{
    label: 'Create account',
    command: () => { createAccount(); }
  },
  ...getAccounts()]
}]);

const toggle = event => menu.value.toggle(event);
const focusActivator = () => activatorEl.value.$el.focus();
const logout = () => {
  confirm.require({
    message: 'Are you sure you want to logout?',
    header: 'Logout',
    acceptLabel: 'Logout',
    accept: () => {
      authApi.logout();
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

<style lang="scss" scoped>
.account-tag {
  background: var(--purple-100);
  color: black;
  font-size: 1.1rem;
  font-weight: 300;
}
</style>
