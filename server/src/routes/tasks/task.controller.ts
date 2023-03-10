import { Account, Task } from '../../database/entities';
import { Request, Response } from 'express';
import { DI } from '../../database/index';
import { processOrderBy } from './utils';

async function list({ query }: Request, res: Response) {
  const { accountId, orderBy } = query;
  if (!accountId) throw new Error('NO ACCOUNT ID');
  const options = {
    orderBy: {},
    filters: ['todaysTask']
  };
  const id = parseInt(accountId as string);
  if (orderBy) {
    options.orderBy = processOrderBy(query.orderBy as string);
  }
  const tasks = await DI.em.find(Task, { account: { id } }, options);

  return res.json(tasks);
}

async function create({ body }: Request, res: Response) {
  const { task: taskData, accountId } = body;
  const account = await DI.em.findOne(Account, { id: accountId });
  if (!account) throw new Error('NO ACCOUNT');
  const task = new Task({ ...taskData, account });
  await DI.em.persistAndFlush(task);

  return res.json(task);
}

async function update({ body }: Request, res: Response) {
  const { parsedId: id } = body;
  const task = await DI.em.findOne(Task, id);
  if (!task) throw new Error(`Task with ID: ${id} does not exist!`);

  task.name = body?.name;
  task.description = body?.description;
  task.deadline = body?.deadline;
  task.priority = body?.priority;
  await DI.em.persistAndFlush(task);

  return res.json(task);
}

async function deleteTask({ body }: Request, res: Response) {
  const { parsedId: id } = body;
  const task = DI.em.getReference(Task, parseInt(id));
  await DI.em.remove(task).flush();

  return res.json(task);
}

async function toggleDone({ body }: Request, res: Response) {
  const { parsedId: id } = body;
  const task = await DI.em.findOne(Task, { id: parseInt(id) });
  if (!task) throw new Error(`Task with ID: ${id} does not exist!`);

  task.done = !task.done;
  await DI.em.persistAndFlush(task);

  return res.json(task);
}

export { create, list, update, deleteTask, toggleDone };
