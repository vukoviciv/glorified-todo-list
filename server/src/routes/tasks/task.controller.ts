import { Request, Response } from 'express';
import { DIinterface } from '../../database/index';
import { processOrderBy } from './utils';

export const createTaskCtrl = (DI: DIinterface) => ({
  list: async ({ query }: Request, res: Response) => {
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
    const tasks = await DI.em.find(DI.TaskEntity, { account: { id } }, options);

    return res.json(tasks);
  },

  create: async ({ body }: Request, res: Response) => {
    const { task: taskData, accountId } = body;
    const account = await DI.em.findOne(DI.AccountEntity, { id: accountId });
    if (!account) throw new Error('NO ACCOUNT');
    const task = new DI.TaskEntity({ ...taskData, account });
    await DI.em.persistAndFlush(task);

    return res.json(task);
  },

  update: async ({ body }: Request, res: Response) => {
    const { parsedId: id } = body;
    const task = await DI.em.findOne(DI.TaskEntity, id);
    if (!task) throw new Error(`Task with ID: ${id} does not exist!`);

    task.name = body?.name;
    task.description = body?.description;
    task.deadline = body?.deadline;
    task.priority = body?.priority;
    await DI.em.persistAndFlush(task);

    return res.json(task);
  },

  deleteTask: async ({ body }: Request, res: Response) => {
    const { parsedId: id } = body;
    const task = DI.em.getReference(DI.TaskEntity, parseInt(id));
    await DI.em.remove(task).flush();

    return res.json(task);
  },

  toggleDone: async ({ body }: Request, res: Response) => {
    const { parsedId: id } = body;
    const task = await DI.em.findOne(DI.TaskEntity, { id: parseInt(id) });
    if (!task) throw new Error(`Task with ID: ${id} does not exist!`);

    task.done = !task.done;
    await DI.em.persistAndFlush(task);

    return res.json(task);
  }
});
