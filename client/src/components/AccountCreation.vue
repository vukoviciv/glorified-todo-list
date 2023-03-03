<template>
  <TodoForm
    @reset:dirty="isDirty = false"
    :validation-rules="validationRules"
    :form="form"
    :submit-action="saveAccounts"
    :is-dirty="isDirty"
    :submit-disabled="submitDisabled"
    submit-text="Continue"
    title="Create Account(s)">
    <div class="px-8 mt-5">
      <p class="ml-3 mb-3">Create an account</p>
      <small id="main-account-description" class="ml-3">
        This will be used as your currently selected account
      </small>
      <div class="flex">
        <RequiredFieldWrapper class="p-inputgroup">
          <div class="p-float-label">
            <InputText
              v-model="form.mainAccount"
              @update:model-value="isDirty=true"
              :id="mainAccountId"
              required="required"
              aria-describedby="main-account-description" />
            <label :for="mainAccountId">Account</label>
          </div>
        </RequiredFieldWrapper>
        <div>
          <Button
            @click="addAccountField()"
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
import usersApi from '@/src/api/users';
import { useStore } from 'vuex';

const form = ref({ mainAccount: '' });
const mainAccountId = 'main-account';
const accounts = ref([]);
const validationRules = {
  mainAccount: { required }
};
const isDirty = ref(false);
const store = useStore();

const submitDisabled = computed(() => {
  return form.value.mainAccount.length < 1;
});
const accountCount = computed(() => accounts.value.length);
const redirectToMain = () => {
  document.location.replace(routes.home);
};
const saveAccounts = () => {
  const mainAccountName = form.value.mainAccount;
  const payload = {
    mainAccountName,
    accountNames: [
      mainAccountName,
      ...accounts.value.map(it => it.name)
    ]
  };
  store.dispatch('createAccounts', payload);

  return usersApi
    .createAccounts(payload)
    .then(() => { redirectToMain(); });
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
  accounts.value.push({ name: '', id });
  focusNewInput(id);
};
const removeAccountField = () => {
  accounts.value.pop();
  const previousAccount = accounts.value.at(accountCount.value - 1);
  const id = previousAccount ? `#${previousAccount.id}` : `#${mainAccountId}`;
  focusInputField(id);
};
onMounted(() => {
  focusInputField(`#${mainAccountId}`);
});
</script>
