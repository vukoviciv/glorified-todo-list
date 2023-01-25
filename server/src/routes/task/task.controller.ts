import { Account, Task } from '../../database/entities';
import { Request, Response } from 'express';
import { DI } from '../../database/index';

async function list({ query }: Request, res: Response) {
  const accounts = await DI.em.find(Account, {}); // TODO: implement localStorage
  if (!accounts) return res.send('No accounts');

  const options = { orderBy: {} };
  if (query.orderBy) options.orderBy = query.orderBy;
  const activeAccount = accounts.pop();
  const tasks = await DI.em.find(Task, { account: activeAccount }, options);

  return res.json(tasks);
}

export { list };
