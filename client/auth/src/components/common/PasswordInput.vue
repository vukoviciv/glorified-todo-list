<template>
  <div class="p-inputgroup">
    <div class="p-float-label">
      <InputText
        v-bind="$attrs"
        :type="passwordFieldType"
        required="required" />
      <label for="password">{{ label }}</label>
    </div>
    <Button
      @click="handlePassIconClick()"
      :icon="passwordIcon"
      :aria-label="passwordLabel"
      :title="passwordLabel" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import Button from 'primevue/Button';
import InputText from 'primevue/inputtext';
import { PrimeIcons } from 'primevue/api';

const PASS_TYPES = {
  PASSWORD: {
    value: 'password',
    label: 'Show password'
  },
  TEXT: {
    value: 'text',
    label: 'Hide password'
  }
};
defineProps({
  label: { type: String, default: 'Password' }
});

const passwordFieldType = ref('password');

const isPassHidden = computed(() => {
  return passwordFieldType.value === PASS_TYPES.PASSWORD.value;
});
const passwordIcon = computed(() => {
  return isPassHidden.value ? PrimeIcons.EYE : PrimeIcons.EYE_SLASH;
});
const passwordLabel = computed(() => {
  return isPassHidden.value ? PASS_TYPES.PASSWORD.label : PASS_TYPES.TEXT.label;
});
const handlePassIconClick = () => {
  passwordFieldType.value = isPassHidden.value ? PASS_TYPES.TEXT.value : PASS_TYPES.PASSWORD.value;
};
</script>
<script>
export default {
  inheritAttrs: false
};
</script>
