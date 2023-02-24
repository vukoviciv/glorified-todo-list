<template>
  <div v-show="snackbar.isActive" class="p-component snackbar-wrapper z-5">
    <div :class="`message-info ${snackbar.className}`" aria-live="polite" aria-atomic="true">
      <div class="message-body">
        <span :class="`snackbar-icon ${snackbar.icon}`"></span>
        <div class="message-text text-bold">
          <span class="font-bold">{{ snackbar.title }}</span>
          <div class="message-content mt-1">
            {{ snackbar.text }}
          </div>
        </div>
        <div>
          <Button
            @click="snackbar.isActive = false"
            :icon="PrimeIcons.TIMES"
            class="p-button-rounded p-button-text"
            aria-live="Close"
            autofocus />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, watch } from 'vue';
import Button from 'primevue/Button';
import { PrimeIcons } from 'primevue/api';

const snackbar = inject('snackbar');

watch(() => snackbar.isActive, val => {
  if (val) {
    setTimeout(() => {
      snackbar.isActive = false;
    }, 4000);
  }
});
</script>

<style lang="scss" scoped>
.snackbar-wrapper {
  position: fixed;
  width: 25rem;
  right: 1.5rem;
  bottom: 1.5rem;
  opacity: 0.9;
  box-sizing: border-box;

  .message-info {
    background: #e9e9ff;
    border: solid var(--primary-400);
    color: var(--primary-400);

    margin: 0 0 1rem 0;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border-radius: 6px;

    &.success {
      border: solid var(--green-600);
      color: var(--green-600);
    }

    &.error {
      border: solid var(--red-600);
      color: var(--red-600);
    }

    &.warning {
      border: solid var(--yellow-800);
      color: var(--yellow-800);
    }

    border-width: 0 0 0 6px;
  }

  .message-body {
    padding: 1rem;
    display: flex;
    align-items: flex-start;
  }

  .message-text {
    margin: 0 0 0 1rem;
    flex: 1 1 auto;
  }
  .snackbar-icon {
    font-size: 2rem;
  }
}
</style>
