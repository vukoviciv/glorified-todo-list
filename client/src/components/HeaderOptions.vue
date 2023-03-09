<template>
  <div class="flex justify-content-end">
    <div class="user-info flex align-items-center ">
      <span>{{ user.fullName }}</span>
      <div>
        <span class="p-sr-only">Active account:</span>
        <span class="ml-3 p-tag account-tag">{{ activeAccount?.name || 'N/A' }}</span>
      </div>
    </div>
    <div class="ml-3">
      <UserMenu :user="user" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import UserMenu from './UserMenu.vue';
import { useStore } from 'vuex';

defineProps({
  user: { type: Object, required: true }
});
const store = useStore();

const activeAccount = computed(() => store.state.activeAccount);
</script>

<style lang="scss" scoped>
.account-tag {
  background: var(--purple-100);
  color: black;
  font-size: 1.1rem;
  font-weight: 300;
}
</style>
