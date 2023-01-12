import { faker } from '@faker-js/faker';

function getTasks(req, res) {
  const tasks = generateItems();
  return res.json(tasks);
}

export default {
  getTasks
};

function generateItems() {
  const items = [];
  for (let i = 0; i < 20; i++) {
    const item = {
      id: faker.datatype.uuid(),
      name: faker.music.songName(),
      description: faker.commerce.productDescription(),
      done: faker.datatype.boolean(),
      deadline: faker.date.future(),
      priority: 'high', // enums
      repeat: null, // TODO
      createdAt: faker.date.recent()
    };
    items.push(item);
  }
  return items;
}
