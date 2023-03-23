/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildAccount, buildReq, buildRes, buildTask, buildUser } from '../../../test-utils/generate';
import { Request, Response } from 'express';
import { createTaskCtrl } from './task.controller';
import { DIinterface } from '../../database';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { Task } from '../../database/entities';

jest.mock('../../database/entities');

describe('user controller', () => {
  let DI: DIinterface;
  let controller: { list: any; create: any; update?: ({ body }: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>; deleteTask?: ({ body }: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>; toggleDone?: ({ body }: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>; };
  const loggedUser = buildUser();
  const res = buildRes();
  const account = buildAccount();
  const task1 = buildTask();
  const task2 = buildTask();
  const tasks = [task1, task2];

  beforeAll(async () => {
    const dbInit = jest.fn().mockImplementation(() => Promise.resolve({
      em: {
        find: () => tasks,
        findOne: jest.fn(() => account),
        persistAndFlush: jest.fn(),
        flush: jest.fn()
      },
      TaskEntity: Task
    }));
    DI = await dbInit();
    controller = createTaskCtrl(DI);
  });

  it('calls list tasks', async () => {
    const req = { query: { accountId: 1 } };
    await controller.list(req, res);

    expect(res.json).toHaveBeenCalledWith(tasks);
  });

  it('creates new task', async () => {
    const newTask = buildTask();
    const body = {
      task: newTask,
      accountId: 1
    };
    const req = buildReq(body);
    await controller.create(req, res);

    expect(DI.em.findOne).toHaveBeenCalled();
    expect(DI.em.findOne).toHaveReturnedWith(account);
    expect(res.json).toHaveBeenCalledWith(newTask);
  });
});
