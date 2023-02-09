import { Request, Response } from 'express';
import { DI } from '../../database/index';
import { Task } from '../../database/entities';

async function list({ query, body: { user } }: Request, res: Response) {
  const { accountId } = query;

  if (!accountId) throw new Error('NO ACCOUNT');
  const options = { orderBy: {} };
  const [account] = await user.accounts.init({ where: { id: accountId } });

  if (query.orderBy) options.orderBy = query.orderBy;
  const tasks = await DI.em.find(Task, { account }, options);

  return res.json(tasks);
}

async function create({ body }: Request, res: Response) {
  const { user } = body;
  console.log({ user });
  const account = body.user.accounts[0]; // TODO:
  const task = new Task({ ...body, account });
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
