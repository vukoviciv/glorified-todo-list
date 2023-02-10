<template>
  <Dialog
    @update:visible="chooseAccount()"
    :visible="showDialog"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '30vw' }">
    <template #header>
      <h2>Choose your account</h2>
    </template>
    <div class="mb-4">
      <p>Choose which account you will use. Every task is bound to your account.</p>
      <p>You can change your decision any time in user settings menu.</p>
    </div>
    <div
      v-for="account of user.accounts"
      :key="account.id"
      class="field-radiobutton">
      <RadioButton
        v-model="selectedAccount"
        :input-id="account.id.toString()"
        :value="account"
        name="account" />
      <label :for="account.id" class="button-label">{{ account.name }}</label>
    </div>
    <template #footer>
      <Button
        @click="chooseAccount()"
        label="Use selected account"
        :icon="PrimeIcons.CHECK" />
    </template>
  </Dialog>
</template>

<script setup>
import Button from 'primevue/Button';
import Dialog from 'primevue/Dialog';
import { PrimeIcons } from 'primevue/api';
import RadioButton from 'primevue/RadioButton';
import { ref } from 'vue';

const props = defineProps({
  user: { type: Object, required: true }
});
const emit = defineEmits(['account:switch']);
const showDialog = ref(true);
const selectedAccount = ref(props.user.accounts[0]);
const chooseAccount = () => {
  emit('account:switch', selectedAccount.value);
  showDialog.value = false;
};

</script>

<style lang="scss" scoped>
.button-label {
  cursor: pointer;
}
</style>
