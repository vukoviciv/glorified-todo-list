<template>
  <TodoForm
    @reset:dirty="isDirty = false"
    :validation-rules="validationRules"
    :form="form"
    :submit-action="saveAccounts"
    :is-dirty="isDirty"
    :submit-enabled="submitEnabled"
    submit-text="Continue"
    title="Create Account(s)">
    <div class="px-8 mt-5">
      <div class="flex align-items-center justify-content-between">
        <p class="ml-3">Create an account</p>
        <Button
          @click="addAccountField"
          label="Add new account"
          :icon="PrimeIcons.PLUS"
          class="justify-" />
      </div>
      <small id="main-account-description" class="ml-3 mt-5 block">
        This one will be used as your currently selected account
      </small>
      <RequiredFieldWrapper class="p-inputgroup">
        <div class="p-float-label">
          <InputText
            v-model="form.mainAccount.name"
            @update:model-value="isDirty=true"
            :id="mainAccountId"
            required="required"
            aria-describedby="main-account-description" />
          <label :for="mainAccountId">Account</label>
        </div>
      </RequiredFieldWrapper>
      <div
        v-for="(account, index) in form.accounts"
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
            @click="removeAccountField()"
            :icon="PrimeIcons.MINUS"
            title="Add account"
            aria-label="Add account"
            class="ml-3 p-button-rounded p-button-outlined p-button-secondary" />
        </div>
      </div>
    </div>
  </TodoForm>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import Button from 'primevue/Button';
import InputText from 'primevue/inputtext';
import { PrimeIcons } from 'primevue/api';
import { required } from '@vuelidate/validators';
import RequiredFieldWrapper from '../../auth/src/components/common/RequiredFieldWrapper.vue';
import { routes } from '@/shared/utils/navigation';
import TodoForm from '../../shared/components/TodoForm.vue';
import { types } from '../../config/snackbar';
import { useSnackbar } from './composables/snackbar';
import { useStore } from 'vuex';

const DEFAULT_ERROR_MSG = 'Something went wrong';
const form = ref({
  mainAccount: { name: '' },
  accounts: []
});
const mainAccountId = 'main-account';
const validationRules = {
  mainAccount: { name: { required } }
};
const isDirty = ref(false);
const store = useStore();
const { showSnackbar } = useSnackbar();

const submitEnabled = computed(() => {
  const filledInput = form.value.accounts.find(it => it.name);
  if (filledInput) return true;

  return form.value.mainAccount.name.length > 0;
});
const accountCount = computed(() => form.value.accounts.length);
const redirectToMain = () => {
  document.location.replace(routes.home);
};
const saveAccounts = () => {
  const mainAccountName = form.value.mainAccount.name;
  const payload = {
    mainAccountName,
    accountNames: [
      mainAccountName,
      ...form.value.accounts.map(it => it.name)
    ]
  };
  store.dispatch('createAccounts', payload)
    .then(() => {
      showSnackbar('Account(s) created!', types.SUCCESS);
    }).catch(error => {
      const text = error.response.data || DEFAULT_ERROR_MSG;
      showSnackbar(text, types.ERROR);
    }).finally(() => redirectToMain());
};
const focusNewInput = id => {
  nextTick(() => {
    document.querySelector(`#${id}`).focus();
  });
};
const focusInputField = elId => {
  document.querySelector(elId).focus();
};
const addAccountField = () => {
  const id = `account-${accountCount.value}`;
  form.value.accounts.push({ name: '', id });
  focusNewInput(id);
};
const removeAccountField = () => {
  form.value.accounts.pop();
  const previousAccount = form.value.accounts.at(accountCount.value - 1);
  const id = previousAccount ? `#${previousAccount.id}` : `#${mainAccountId}`;
  focusInputField(id);
};
onMounted(() => {
  focusInputField(`#${mainAccountId}`);
});
</script>
