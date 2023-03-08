<template>
  <div class="back-to-top fixed bottom-0 right-0 z-5 m-3">
    <a v-if="visible" @click.prevent="scrollToElement" href="#main-page" class="p-3 block">
      Back to top
      <TdIcon :icon="PrimeIcons.ARROW_UP" class="ml-2" />
    </a>
  </div>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { DomHandler } from 'primevue/utils';
import { PrimeIcons } from 'primevue/api';
import TdIcon from '../../src/components/common/TdIcon.vue';

const props = defineProps({
  elId: { type: String, required: true },
  treshold: { type: Number, default: 400 }
});

const visible = ref(false);

const scrollToElement = () => {
  document.querySelector(`#${props.elId}`).scrollIntoView();
};
const checkVisibility = scrollY => {
  visible.value = scrollY > props.treshold;
};
const scrollListener = () => {
  checkVisibility(DomHandler.getWindowScrollTop());
};
const bindScrollListener = () => {
  window.addEventListener('scroll', scrollListener);
};
const unbindScrollListener = () => {
  window.removeEventListener('scroll');
};

onBeforeMount(() => {
  bindScrollListener();
});
onBeforeUnmount(() => {
  unbindScrollListener();
});
</script>

<style lang="scss">
html {
  @media (prefers-reduced-motion: no-preference) {
    scroll-behavior: smooth;
  }
}
.back-to-top {
  font-family: var(--font-family);
  background-color: var(--primary-100);
  color: var(--primary-700);
  border-radius: 5px;
  scroll-behavior: smooth;
}
</style>
