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
    tasks: [],
    user: null,
    isFetching: false,
    activeAccount: null
  },
  getters: {
    getDoneTasks: state => {
      return state.tasks.filter(task => task.done);
    },
    getPendingTasks: state => {
      return state.tasks.filter(task => !task.done);
    },
    getActiveAccount: state => {
      return state.activeAccount;
    },
    getAccounts: state => {
      return state.user.accounts;
    }
  },
  actions: {
    initialFetch: async ({ dispatch }) => {
      await dispatch('fetchUser');
      await dispatch('fetchTasks');
    },
    fetchTasks: async ({ commit, state }, options = {}) => {
      const accountId = options?.accountId || state.activeAccount?.id;
      state.isFetching = true;

      return tasksApi.fetch({ accountId, ...options })
        .then(tasks => {
          commit('setTasks', tasks);
          state.isFetching = false;
        });
    },
    createTask: async ({ commit, dispatch, state }, task) => {
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
    toggleDone: async ({ commit, state }, id) => {
      return tasksApi.toggleDone(id)
        .then(task => {
          const updatedTasks = getUpdatedList(state.tasks, task);
          commit('setTasks', updatedTasks);
        });
    },
    fetchUser: async ({ commit, state }) => {
      state.isFetching = true;
      const savedAccount = localStorageAccount?.item;

      return userApi.getMe()
        .then(user => {
          commit('setUser', user);
          const activeAccount = savedAccount || user.accounts[0];
          commit('setActiveAccount', activeAccount);
          state.isFetching = false;
        });
    },
    updateActiveAccount: async ({ commit, dispatch, state }, account) => {
      state.isFetching = true;
      localStorageAccount.setItem(account);
      dispatch('fetchTasks', { accountId: account.id })
        .then(() => {
          commit('setActiveAccount', account);
        });
    },
    updateOrder: async ({ commit, dispatch }, orderValue) => {
      const item = orderBy.list[orderValue];
      dispatch('fetchTasks', { orderBy: item.value });
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
