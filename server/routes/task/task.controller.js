import { faker } from '@faker-js/faker';
import { priority } from '../../../config/task.js';

function list(_, res) {
  const tasks = generateItems();
  return res.json(tasks);
}

export default {
  list
};

function generateItems() {
  const items = [];
  const priorities = priority.list;

  for (let i = 0; i < 20; i++) {
    const priorityIndex = i % 3;
    const item = {
      id: faker.datatype.uuid(),
      name: faker.music.songName(),
      description: faker.commerce.productDescription(),
      done: faker.datatype.boolean(),
      deadline: faker.date.future(),
      priority: priorities.at(priorityIndex),
      repeat: null, // TODO
      createdAt: faker.date.recent()
    };
    items.push(item);
  }
  return items;
}
