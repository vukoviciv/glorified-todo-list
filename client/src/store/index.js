import { createStore } from 'vuex';
import { localStorageAccount } from '../components/service/localStorage';
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
    }
  },
  actions: {
    fetchTasks: async ({ commit, state }, options = {}) => {
      const accountId = options?.accountId || state.activeAccount?.id;
      state.isFetching = true;

      return tasksApi.fetch({ accountId, ...options })
        .then(tasks => {
          commit('setTasks', tasks);
          state.isFetching = false;
        });
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
      dispatch('fetchTasks', { accountId: account.id })
        .then(() => {
          commit('setActiveAccount', account);
        });
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
