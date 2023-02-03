import { Request, Response } from 'express';
import { DI } from '../../database/index';
import { Task } from '../../database/entities';

async function list({ query, body: { account } }: Request, res: Response) {
  const options = { orderBy: {} };
  if (query.orderBy) options.orderBy = query.orderBy;
  const tasks = await DI.em.find(Task, { account }, options);

  return res.json(tasks);
}

async function create({ body }: Request, res: Response) {
  const task = new Task(body);
  await DI.em.persistAndFlush(task);

  return res.json(task);
}

async function update({ body, params: { id } }: Request, res: Response) {
  const task = await DI.em.findOne(Task, { id: parseInt(id) });
  if (!task) throw new Error(`Task with ID: ${id} does not exist!`);

  task.name = body?.name;
  task.description = body?.description;
  task.deadline = body?.deadline;
  task.priority = body?.priority;
  await DI.em.persistAndFlush(task);

  return res.json(task);
}

async function toggleDone({ params: { id } }: Request, res: Response) {
  const task = await DI.em.findOne(Task, { id: parseInt(id) });
  if (!task) throw new Error(`Task with ID: ${id} does not exist!`);

  task.done = !task.done;
  await DI.em.persistAndFlush(task);

  return res.json(task);
}

export { create, list, update, toggleDone };
