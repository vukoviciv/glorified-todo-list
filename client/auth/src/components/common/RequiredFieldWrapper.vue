<template>
  <div class="required-field">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.required-field::before {
  padding-right: 0.5rem;
  content: '*';
  color: var(--red-500);
}
</style>
