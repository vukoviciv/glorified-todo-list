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
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW'
};

async function list(_req: Request, res: Response) {
  const account = await DI.em.findOne(Account, 1);
  let tasks = await DI.em.find(Task, {});
  console.log(tasks);
  if (!tasks.length && account) {
    await createTasks(account);
    DI.em.persist(account);

    tasks = await DI.em.find(Task, {});
  }
  res.json(tasks);
}

async function create(_req: Request, res: Response) {
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

async function createTasks(account: Account) {
  const priorities = Object.values(priority);

  for (let i = 0; i < 20; i++) {
    const priorityIndex = i % 3;
    const item = {
      name: faker.music.songName(),
      description: faker.commerce.productDescription(),
      done: faker.datatype.boolean(),
      deadline: faker.date.future(),
      priority: priorities.at(priorityIndex)
    };
    const taskTuple: [string, string, Account] = [
      item.name,
      item.description,
      account
    ];
    const task = await new Task(...taskTuple);
    task.deadline = item.deadline;
    task.done = item.done;

    DI.em.persistAndFlush(task);
  }
}
