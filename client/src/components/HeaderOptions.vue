<template>
  <div>
    <div class="user-menu-wrapper flex align-items-center justify-content-end">
      <div>Ivana Šimić</div>
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
import Button from 'primevue/Button';
import ConfirmDialog from 'primevue/confirmdialog';
import Menu from 'primevue/Menu';
import { PrimeIcons } from 'primevue/api';
import { ref } from 'vue';
import { routes } from '@/shared/utils/navigation';
import { useConfirm } from 'primevue/useconfirm';

const activatorEl = ref(null);
const confirm = useConfirm();
const menu = ref();

const items = ref([{
  label: 'Account',
  items: [{
    label: 'Profile',
    icon: PrimeIcons.USER
  }, {
    label: 'Logout',
    icon: PrimeIcons.SIGN_OUT,
    command: () => { logout(); }
  }]
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
