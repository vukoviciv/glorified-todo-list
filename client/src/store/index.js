import authApi from '@/auth/src/api/auth';
import { createStore } from 'vuex';
import { localStorageAccount } from '../components/service/localStorage';
import { orderBy } from '@/config/task';
import tasksApi from '../api/tasks';
import userApi from '../api/users';

const getUpdatedList = (items, task) => {
  return items.map(item => (item.id === task.id ? task : item));
};

export default createStore({
  state: {
    isFetching: false,
    tasks: [],
    user: null,
    activeAccount: null
  },
  getters: {
    getDoneTasks: state => {
      return state.tasks.filter(task => task.done);
    },
    getPendingTasks: state => {
      return state.tasks.filter(task => !task.done);
    },
    getAccounts: state => {
      return state.user.accounts;
    }
  },
  actions: {
    initialize: async ({ commit, dispatch }) => {
      const existingAccount = localStorageAccount.item;
      if (existingAccount) commit('setActiveAccount', existingAccount);
      await dispatch('fetchUser');
      dispatch('fetchTasks');
    },
    fetchUser: ({ commit, dispatch, state }) => {
      state.isFetching = true;

      return userApi.getMe()
      .then(user => {
        commit('setUser', user);
        state.isFetching = false;
        if (state.activeAccount) return;
        if (!user.accounts.length) return;
        dispatch('saveActiveAccount', user.accounts[0]);
      });
    },
    fetchTasks: async ({ commit, state }, options = {}) => {
      const accountId = options?.accountId || state.activeAccount?.id;
      if (!accountId) return;
      state.isFetching = true;

      return tasksApi.fetch({ accountId, ...options })
        .then(tasks => {
          commit('setTasks', tasks);
          state.isFetching = false;
        });
    },
    createTask: async ({ dispatch, state }, task) => {
      const accountId = state.activeAccount.id;
      const payload = { task, accountId };

      return tasksApi.create(payload)
        .then(() => dispatch('fetchTasks'));
    },
    updateTask: async ({ commit, state }, task) => {
      return tasksApi.update(task)
        .then(task => {
          const updatedTasks = getUpdatedList(state.tasks, task);
          commit('setTasks', updatedTasks);
        });
    },
    deleteTask: async ({ commit, state }, id) => {
      return tasksApi.deleteTask(id)
        .then(task => {
          const updatedTasks = state.tasks.filter(item => (item.id !== task.id));
          commit('setTasks', updatedTasks);
        });
    },
    toggleDone: ({ commit, state }, id) => {
      return tasksApi.toggleDone(id)
        .then(task => {
          const updatedTasks = getUpdatedList(state.tasks, task);
          commit('setTasks', updatedTasks);
          return task;
        });
    },
    updateActiveAccount: async ({ dispatch }, account) => {
      await dispatch('fetchTasks', { accountId: account.id });
      dispatch('saveActiveAccount', account);
    },
    updateOrder: ({ dispatch }, orderValue) => {
      const item = orderBy.list[orderValue];
      dispatch('fetchTasks', { orderBy: item.value });
    },
    createAccounts: ({ commit, dispatch }, payload) => {
      const { accountNames, mainAccountName } = payload;

      return userApi.createAccounts({ accountNames })
        .then(({ user }) => {
          const accounts = user.accounts;
          const activeAccount = accounts.find(it => it.name === mainAccountName);
          dispatch('updateActiveAccount', activeAccount);
          commit('setUser', user);
        });
    },
    saveActiveAccount: ({ commit }, account) => {
      if (!account) return;
      localStorageAccount.setItem(account);
      commit('setActiveAccount', account);
    },
    logout: () => {
      localStorageAccount.clear();

      return authApi.logout();
    }
  },
  mutations: {
    setActiveAccount: (state, account) => {
      state.activeAccount = account;
    },
    setTasks: (state, tasks) => {
      state.tasks = tasks;
    },
    setUser: (state, user) => {
      state.user = user;
    }
  }
});
