import { Account, Task, TaskPriority, User } from '../../database/entities';
import { Request, Response } from 'express';
import { DI } from '../../database/index';
import { faker } from '@faker-js/faker';

async function list(_req: Request, res: Response) {
  const activeAccount = await DI.em.findOne(Account, 1); // TODO: implement localStorage
  let tasks = await DI.em.find(Task, {});
  if (!tasks.length && activeAccount) {
    await createTasks(activeAccount);
    DI.em.persist(activeAccount);

    tasks = await DI.em.find(Task, {});
  }
  res.json(tasks);
}

async function create(_req: Request, res: Response) {
  // const user = await new User('Ivana', 'Simic');
  // const activeAccount = await new Account('test account', user);
  // const item = {
  //   name: faker.music.songName(),
  //   description: faker.commerce.productDescription(),
  //   done: faker.datatype.boolean(),
  //   deadline: faker.date.future(),
  //   priority: TaskPriority.MEDIUM,
  //   account: activeAccount
  // };
  // const task = await new Task(item);
  // DI.em.persistAndFlush(activeAccount);
  // DI.em.persistAndFlush(user);
  // DI.em.persistAndFlush(task);
  // res.json({ user, activeAccount });
}

export { create, list };

async function createTasks(account: Account) {
  const priorities = Object.keys(TaskPriority);
  for (let i = 0; i < 20; i++) {
    const priorityIndex = i % 3;
    const item = {
      name: faker.music.songName(),
      description: faker.commerce.productDescription(),
      done: faker.datatype.boolean(),
      deadline: faker.date.future(),
      priority: priorities.at(priorityIndex),
      account
    };
    const task = await new Task(item);
    task.deadline = item.deadline;
    task.done = item.done;

    DI.em.persistAndFlush(task);
  }
}
