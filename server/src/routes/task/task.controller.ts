import { Request, Response } from 'express';
import { DI } from '../../database/index';
import { Task } from '../../database/entities';

async function list({ query, body }: Request, res: Response) {
  const { account } = body;
  const options = { orderBy: {} };
  if (query.orderBy) options.orderBy = query.orderBy;
  const tasks = await DI.em.find(Task, { account }, options);

  return res.json(tasks);
}

async function create({ body }: Request, res: Response) {
  const task = new Task(body);
  DI.em.persistAndFlush(task);

  return res.json(task);
}

async function update({ body, params: { id } }: Request, res: Response) {
  const task = await DI.em.upsert(Task, { id, ...body });

  return res.json(task);
}

// TODO: create toggleDone

export { create, list, update };
