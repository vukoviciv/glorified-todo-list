import { createStore } from 'vuex';
import tasksApi from '../api/tasks';
import userApi from '../api/users';

const getUpdatedList = (items, task) => {
  return items.map(item => (item.id === task.id ? task : item));
};

export default createStore({
  state: {
    tasks: [],
    user: null,
    isFetching: false
  },
  getters: {
    getDoneTasks: state => {
      return state.tasks.filter(task => task.done);
    },
    getPendingTasks: state => {
      return state.tasks.filter(task => !task.done);
    }
  },
  actions: {
    fetchTasks: async ({ state }, params = {}) => {
      const accountId = 1; // TODO:
      state.isFetching = true;
      return tasksApi.fetch({ accountId, ...params })
        .then(tasks => {
          state.tasks = tasks;
          state.isFetching = false;
        });
    },
    updateTask: async ({ state }, task) => {
      return tasksApi.update(task)
        .then(task => {
          state.tasks = getUpdatedList(state.tasks, task);
        });
    },
    deleteTask: async ({ state }, id) => {
      return tasksApi.deleteTask(id)
        .then(task => {
          state.tasks = state.tasks.filter(item => (item.id !== task.id));
        });
    },
    toggleDone: async ({ state }, id) => {
      return tasksApi.toggleDone(id)
        .then(task => {
          state.tasks = getUpdatedList(state.tasks, task);
        });
    },
    fetchUser: async ({ state }) => {
      state.isFetching = true;
      return userApi.getMe()
        .then(user => {
          state.user = user;
          state.isFetching = false;
        });
    }
  }
});
