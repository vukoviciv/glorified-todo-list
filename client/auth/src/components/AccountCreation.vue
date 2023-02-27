<template>
  <LogistrationForm
    @reset:dirty="isDirty = false"
    :validation-rules="validationRules"
    :form="form"
    :submit-action="login"
    :is-dirty="isDirty"
    :submit-disabled="submitDisabled"
    submit-text="Continue"
    title="Create Account(s)">
    <div class="px-8 mt-5">
      <p class="ml-3 mb-3">Create an account</p>
      <div class="flex">
        <RequiredFieldWrapper class="p-inputgroup">
          <div class="p-float-label">
            <InputText
              v-model="form.mainAccount"
              @update:model-value="isDirty=true"
              :id="mainAccountId"
              required="required"
              autofocus />
            <label :for="mainAccountId">Account</label>
          </div>
        </RequiredFieldWrapper>
        <div>
          <Button
            @click="addAccount()"
            :icon="PrimeIcons.PLUS"
            title="Add account"
            aria-label="Add account"
            class="ml-3 p-button-rounded p-button-outlined p-button-secondary" />
        </div>
      </div>
      <div
        v-for="(account, index) in accounts"
        :key="index"
        class="flex mt-3">
        <div class="p-float-label w-full ml-3">
          <InputText
            v-model="account.name"
            @update:model-value="isDirty=true"
            :id="account.id"
            class="w-full" />
          <label :for="account.id">Account {{ index + 1 }}</label>
        </div>
        <div>
          <Button
            @click="removeAccount()"
            :icon="PrimeIcons.MINUS"
            title="Add account"
            aria-label="Add account"
            class="ml-3 p-button-rounded p-button-outlined p-button-secondary" />
        </div>
      </div>
    </div>
  </LogistrationForm>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue';
import Button from 'primevue/Button';
import InputText from 'primevue/inputtext';
import LogistrationForm from './common/LogistrationForm.vue';
import { PrimeIcons } from 'primevue/api';
import { required } from '@vuelidate/validators';
import RequiredFieldWrapper from './common/RequiredFieldWrapper.vue';

const form = ref({ mainAccount: '' });
const mainAccountId = 'main-account';
const accounts = ref([]);
const validationRules = {
  mainAccount: { required }
};
const isDirty = ref(false);

const submitDisabled = computed(() => {
  return form.value.mainAccount.length < 1;
});
const accountCount = computed(() => accounts.value.length);
const login = () => {
  console.log('logging in with account');
};
const focusNewInput = id => {
  nextTick(() => {
    document.querySelector(`#${id}`).focus();
  });
};
const focusPreviousInput = id => {
  document.querySelector(id).focus();
};
const addAccount = () => {
  const id = `account-${accountCount.value}`;
  accounts.value.push({ name: '', id });
  focusNewInput(id);
};
const removeAccount = () => {
  accounts.value.pop();
  const previousAccount = accounts.value.at(accountCount.value - 1);
  const id = previousAccount ? `#${previousAccount.id}` : `#${mainAccountId}`;
  focusPreviousInput(id);
};
</script>
