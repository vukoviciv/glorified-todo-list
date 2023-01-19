import { Account, Task, User } from '../../database/entities';
import { Request, Response } from 'express';
import { DI } from '../../database/index';
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

async function create(req: Request, res: Response) {
  const user = await new User('Ivana', 'Simic');
  const account = await new Account('test account', user);
  const taskTuple: [string, string, Account] = [
    'Task name',
    'Task description lorem ipsum',
    account
  ];
  const task = await new Task(...taskTuple);

  DI.em.persistAndFlush(account);
  DI.em.persistAndFlush(user);
  DI.em.persistAndFlush(task);
  res.json({ user, account, task });
}

export { create, list };

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
