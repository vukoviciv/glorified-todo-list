import { createStore } from 'vuex';
import tasks from '../api/tasks';

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
      tasks
        .fetch({ accountId })
        .then(tasks => {
          commit('setTasks', tasks);
        });
    }
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    }
  }
});
