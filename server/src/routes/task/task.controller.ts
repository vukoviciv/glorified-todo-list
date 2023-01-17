import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';

interface Priority {
  HIGH: string,
  MEDIUM: string,
  LOW: string
}

const priority: Priority = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};

function list(_: Request, res: Response) {
  const tasks = generateItems();
  return res.json(tasks);
}

export { list };

function generateItems() {
  const items = [];
  const priorities = Object.values(priority);

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
