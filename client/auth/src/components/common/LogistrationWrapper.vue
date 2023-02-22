<template>
  <div class="login-wrapper min-h-screen">
    <form @submit.prevent class="pt-8">
      <Card class="m-auto md:col-6">
        <template v-if="title" #title>
          <h2 class="text-center">{{ title }}</h2>
        </template>
        <template #content>
          <slot></slot>
        </template>
        <template #footer>
          <Divider align="center">
            <div class="inline-flex">
              <span :class="`${PrimeIcons.USER} mx-2`"></span>
            </div>
          </Divider>
          <div class="error-msg px-8 mb-2" aria-live="polite">
            <div v-if="hasErrors">
              <p v-for="(error, index) of errorMessages" :key="index">
                <span class="">{{ error }}</span>
              </p>
            </div>
          </div>
          <div class="mb-5">
            <slot name="actions"></slot>
          </div>
        </template>
      </Card>
    </form>
  </div>
</template>

<script setup>
import Card from 'primevue/card';
import { computed } from 'vue';
import Divider from 'primevue/Divider';
import { PrimeIcons } from 'primevue/api';

const props = defineProps({
  title: { type: String, default: null },
  errorMessages: { type: Array, default: () => ([]) }
});

const hasErrors = computed(() => props.errorMessages.length > 0);
</script>

<style lang="scss" scoped>
.login-wrapper {
  background: url(../../assets/auth_background.jpg);
  background-size: cover;

  .error-msg {
    color: var(--red-500);
  }
}
</style>
