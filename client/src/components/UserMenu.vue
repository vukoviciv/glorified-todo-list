<template>
  <Button
    ref="activatorEl"
    @click="toggle"
    :icon="PrimeIcons.USER"
    class="p-button-rounded p-button-secondary"
    aria-haspopup="true"
    aria-label="Account menu"
    :aria-controls="ariaControls" />
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
</template>

<script setup>
import { computed, ref } from 'vue';
import Button from 'primevue/Button';
import ConfirmDialog from 'primevue/confirmdialog';
import Menu from 'primevue/Menu';
import { PrimeIcons } from 'primevue/api';
import { routes } from '@/shared/utils/navigation';
import { useConfirm } from 'primevue/useconfirm';
import { useStore } from 'vuex';

const props = defineProps({
  user: { type: Object, required: true }
});
const confirm = useConfirm();

const activatorEl = ref(null);
const ariaControls = ref(null);
const menu = ref();
const store = useStore();

const activeAccount = computed(() => store.getters.getActiveAccount);
const items = computed(() => {
  return [{
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
  }];
});
const createAccount = () => document.location.replace(routes.createAccount);
const toggle = event => {
  // a11y issue fix: aria-controls points at non-existing DOM element (it has to correspond to a valid value)
  ariaControls.value = event ? 'menu-overlay' : null;
  menu.value.toggle(event);
};
const focusActivator = () => activatorEl.value.$el.focus();
const updateAccount = account => {
  store.dispatch('updateActiveAccount', account);
};
const getAccounts = () => {
  return store.getters.getAccounts.map(it => {
    const isActive = it.id === activeAccount.value?.id;
    const icon = isActive ? PrimeIcons.CHECK_CIRCLE : '';
    return {
      icon,
      id: it.id,
      label: `${it.name}`,
      command: () => { updateAccount(it); }
    };
  });
};
const logout = () => {
  confirm.require({
    message: 'Are you sure you want to logout?',
    header: 'Logout',
    acceptLabel: 'Logout',
    accept: () => {
      store.dispatch('logout')
        .then(() => {
          document.location.replace(routes.logout);
        });
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
