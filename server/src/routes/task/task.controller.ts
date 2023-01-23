import { Account, Task } from '../../database/entities';
import { Request, Response } from 'express';
import { DI } from '../../database/index';

async function list(_req: Request, res: Response) {
  const accounts = await DI.em.find(Account, {}); // TODO: implement localStorage
  if (!accounts) return res.send('No accounts');

  const activeAccount = accounts.pop();
  const tasks = await DI.em.find(Task, { account: activeAccount });
  return res.json(tasks);
}

export { list };
