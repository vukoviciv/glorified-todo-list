import { Account, Task } from '../../database/entities';
import { Request, Response } from 'express';
import { DI } from '../../database/index';

async function list(_req: Request, res: Response) {
  const activeAccount = await DI.em.findOne(Account, 1); // TODO: implement localStorage
  let tasks = await DI.em.find(Task, {});
  if (!tasks.length || !activeAccount) return res.send('No items');

  tasks = await DI.em.find(Task, {});
  res.json(tasks);
}

export { list };
