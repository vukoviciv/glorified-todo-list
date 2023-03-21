import authApi from '@/auth/src/api/auth';
import { getUpdatedList } from './utils';
import { localStorageAccount } from '../components/service/localStorage';
import { orderBy } from '@/config/task';
import tasksApi from '../api/tasks';
import userApi from '../api/users';

export const initialize = async ({ commit, dispatch }) => {
  const existingAccount = localStorageAccount.item;
  if (existingAccount) commit('setActiveAccount', existingAccount);
  await dispatch('fetchUser');
  dispatch('fetchTasks');
};

export const fetchUser = ({ commit, dispatch, state }) => {
  state.isFetching = true;

  return userApi.getMe()
    .then(user => {
      commit('setUser', user);
      state.isFetching = false;
      if (state.activeAccount) return;
      if (!user.accounts.length) return;
      dispatch('saveActiveAccount', user.accounts[0]);
    });
};

export const fetchTasks = async ({ commit, state }, options = {}) => {
  const accountId = options?.accountId || state.activeAccount?.id;
  if (!accountId) return;
  state.isFetching = true;

  return tasksApi.fetch({ accountId, ...options })
    .then(tasks => {
      commit('setTasks', tasks);
      state.isFetching = false;
    });
};

export const createTask = async ({ dispatch, state }, task) => {
  const accountId = state.activeAccount.id;
  const payload = { task, accountId };

  return tasksApi.create(payload)
    .then(() => dispatch('fetchTasks'));
};

export const updateTask = async ({ commit, state }, task) => {
  return tasksApi.update(task)
    .then(task => {
      const updatedTasks = getUpdatedList(state.tasks, task);
      commit('setTasks', updatedTasks);
    });
};

export const deleteTask = async ({ commit, state }, id) => {
  return tasksApi.deleteTask(id)
    .then(task => {
      const updatedTasks = state.tasks.filter(item => (item.id !== task.id));
      commit('setTasks', updatedTasks);
    });
};

export const toggleDone = ({ commit, state }, id) => {
  return tasksApi.toggleDone(id)
    .then(task => {
      const updatedTasks = getUpdatedList(state.tasks, task);
      commit('setTasks', updatedTasks);

      return task;
    });
};

export const updateActiveAccount = async ({ dispatch }, account) => {
  await dispatch('fetchTasks', { accountId: account.id });
  dispatch('saveActiveAccount', account);
};

export const updateOrder = ({ dispatch }, orderValue) => {
  const item = orderBy.list[orderValue];
  dispatch('fetchTasks', { orderBy: item.value });
};

export const createAccounts = ({ commit, dispatch }, payload) => {
  const { accountNames, mainAccountName } = payload;

  return userApi.createAccounts({ accountNames })
    .then(({ user }) => {
      const accounts = user.accounts;
      const activeAccount = accounts.find(it => it.name === mainAccountName);
      dispatch('updateActiveAccount', activeAccount);
      commit('setUser', user);
    });
};

export const saveActiveAccount = ({ commit }, account) => {
  if (!account) return;
  localStorageAccount.setItem(account);
  commit('setActiveAccount', account);
};

export const logout = () => {
  localStorageAccount.clear();

  return authApi.logout();
};
