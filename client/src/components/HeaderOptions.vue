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
        <Menu
          v-if="user.accounts"
          ref="menu"
          id="overlay-menu"
          :model="items"
          :popup="true" />
      </div>
    </div>
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
import { localStorageAccount } from './service/localStorage';
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
const toggle = event => menu.value.toggle(event);
const focusActivator = () => activatorEl.value.$el.focus();
const updateAccount = account => {
  localStorageAccount.setItem(account);
  store.dispatch('updateActiveAccount', account);
};
const getAccounts = () => {
  return store.getters.getAccounts.map(it => {
    const isActive = it.id === activeAccount.value?.id;
    const icon = isActive ? PrimeIcons.CHECK_CIRCLE : '';
    return {
      icon,
      id: it.id,
      label: `${it.name} - ${it.id}`,
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
