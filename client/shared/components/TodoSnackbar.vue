<template>
  <div class="p-component snackbar-wrapper z-5">
    <div class="message-info" aria-live="polite" aria-atomic="true">
      <div class="message-body">
        <span :class="`snackbar-icon ${PrimeIcons.INFO_CIRCLE}`"></span>
        <div class="message-text">
          <span class="message-title font-bold">{{ title }}</span>
          <div v-if="content" class="message-content mt-1">{{ content }}</div>
        </div>
        <div>
          <Button
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
import Button from 'primevue/Button';
import { PrimeIcons } from 'primevue/api';

defineProps({
  title: { type: String, required: true },
  content: { type: String, default: '' }
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
    border-width: 0 0 0 6px;
    color: var(--primary-400);

    margin: 0 0 1rem 0;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border-radius: 6px;
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
