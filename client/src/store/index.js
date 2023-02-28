import { createStore } from 'vuex';
import tasksApi from '../api/tasks';
import userApi from '../api/users';

export default createStore({
  state: {
    tasks: [],
    user: null,
    isFetching: false
  },
  getters: {
    getAllTasks: state => {
      return state.tasks;
    },
    getDoneTasks: state => {
      return state.tasks.filter(task => task.done);
    },
    getPendingTasks: state => {
      return state.tasks.filter(task => !task.done);
    },
    getUser: state => {
      return state.user;
    }
  },
  actions: {
    fetchTasks: async ({ commit, state }, params = {}) => {
      const accountId = 1; // TODO:
      state.isFetching = true;
      return tasksApi
        .fetch({ accountId, ...params })
        .then(tasks => {
          commit('setTasks', tasks);
          state.isFetching = false;
        });
    },
    updateTask: async ({ commit }, task) => {
      return tasksApi
        .update(task)
        .then(task => {
          commit('updateTasks', task);
        });
    },
    deleteTask: async ({ commit }, id) => {
      return tasksApi
        .deleteTask(id)
        .then(task => {
          commit('deleteTask', task);
        });
    },
    toggleDone: async ({ commit }, id) => {
      return tasksApi
        .toggleDone(id)
        .then(task => {
          commit('updateTasks', task);
        });
    },
    fetchUser: async ({ commit, state }) => {
      state.isFetching = true;
      return userApi
        .getMe()
        .then(user => {
          commit('setUser', user);
          state.isFetching = false;
        });
    }
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    updateTasks(state, task) {
      state.tasks = state.tasks.map(item => (item.id === task.id ? task : item));
    },
    deleteTask(state, task) {
      state.tasks = state.tasks.filter(item => (item.id !== task.id));
    },
    setUser(state, user) {
      state.user = user;
    }
  }
});
