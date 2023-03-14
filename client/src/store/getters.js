export const getDoneTasks = state => {
  return state.tasks.filter(task => task.done);
};

export const getPendingTasks = state => {
  return state.tasks.filter(task => !task.done);
};

export const getAccounts = state => {
  return state.user?.accounts;
};
