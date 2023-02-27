<template>
  <div v-show="snackbar.isActive" class="p-component snackbar-wrapper z-5">
    <div
      :class="`message-info mb-1 ${snackbar.className}`"
      aria-live="polite"
      aria-atomic="true">
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

const triggerTimeout = () => {
  setTimeout(() => {
    snackbar.isActive = false;
  }, snackbar.time);
};

watch(() => snackbar.isActive, val => {
  if (val) triggerTimeout();
});
</script>

<style lang="scss" scoped>
@mixin border($color) {
  border: solid $color;
  color: $color;
  border-width: 0 0 0 6px;
  border-radius: 6px;
}
.snackbar-wrapper {
  position: fixed;
  width: 25rem;
  right: 1.5rem;
  bottom: 1.5rem;
  opacity: 0.9;
  box-sizing: border-box;

  .message-info {
    background: #e9e9ff;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    @include border(var(--primary-400));

    &.success {
      @include border(var(--green-600));
    }

    &.error {
      @include border(var(--red-600));
    }

    &.warning {
      @include border(var(--yellow-800));
    }
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
