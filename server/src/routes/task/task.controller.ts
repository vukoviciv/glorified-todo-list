import { Account, Task } from '../../database/entities';
import { Request, Response } from 'express';
import { DI } from '../../database/index';

async function list(req: Request, res: Response) {
  const accounts = await DI.em.find(Account, {}); // TODO: implement localStorage
  if (!accounts) return res.send('No accounts');

  const { query } = req;
  const defaultOrderBy = { priority: 'ASC', name: 'ASC' } as const;
  const activeAccount = accounts.pop();
  const orderBy = Object.assign({}, defaultOrderBy, query.orderBy);
  const tasks = await DI.em.find(Task, { account: activeAccount }, { orderBy });

  return res.json(tasks);
}

export { list };
