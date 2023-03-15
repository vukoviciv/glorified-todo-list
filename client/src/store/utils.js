export const getUpdatedList = (items, task) => {
  return items.map(item => (item.id === task.id ? task : item));
};
