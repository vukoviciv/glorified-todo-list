import { createStore } from 'vuex';
import tasksApi from '../api/tasks';

export default createStore({
  state: {
    tasks: [],
    user: null
  },
  getters: {
    hasTasks: state => {
      return !state.tasks.length;
    },
    getAllTasks: state => {
      return state.tasks;
    },
    getDoneTasks: state => {
      return state.tasks.filter(task => task.done);
    },
    getPendingTasks: state => {
      return state.tasks.filter(task => !task.done);
    }
  },
  actions: {
    fetchTasks: async ({ commit }) => {
      const accountId = 1; // TODO:
      return tasksApi
        .fetch({ accountId })
        .then(tasks => {
          commit('setTasks', tasks);
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
    }
  }
});
