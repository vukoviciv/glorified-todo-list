/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildAccount, buildDbInit, buildReq, buildRes, buildTask } from '../../../test-utils/generate';
import { createTaskCtrl } from './task.controller';
import { DIinterface } from '../../database';

describe('task list and create', () => {
  let DI: DIinterface;
  let controller: { list: any; create: any; };
  let res = buildRes();
  const account = buildAccount();
  const task1 = buildTask();
  const task2 = buildTask();
  const tasks = [task1, task2];

  beforeAll(async () => {
    const emOverrides = {
      find: () => tasks,
      findOne: jest.fn(() => account)
    };
    const dbInit = buildDbInit(emOverrides);
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
    const resOverrides = {
      json: jest.fn(() => ({ task: newTask }))
    };
    res = buildRes(resOverrides);
    await controller.create(req, res);

    expect(DI.em.findOne).toHaveBeenCalled();
    expect(DI.em.findOne).toHaveReturnedWith(account);

    expect(res.json).toHaveReturnedWith({ task: newTask });
  });
});

describe('update', () => {
  let DI: DIinterface;
  const task = buildTask();
  let controller: { update: any; toggleDone: any };

  beforeAll(async () => {
    const emOverrides = {
      findOne: jest.fn(() => task)
    };
    const dbInit = buildDbInit(emOverrides);
    DI = await dbInit();
    controller = createTaskCtrl(DI);
  });

  it('updates the task', async () => {
    const resultProps = {
      description: 'Updated description',
      priority: 2
    };
    const resultTask = Object.assign({}, task, resultProps);
    const body = {
      task: task.id,
      ...resultProps
    };
    const req = buildReq(body);
    const resOverrides = {
      json: jest.fn(() => ({ task: resultTask }))
    };
    const res = buildRes(resOverrides);
    await controller.update(req, res);

    expect(DI.em.findOne).toHaveBeenCalled();
    expect(DI.em.findOne).toHaveReturnedWith(task);

    expect(res.json).toHaveReturnedWith({ task: resultTask });
  });

  it('toggles the task', async () => {
    const resultDone = !task.done;
    const resultTask = Object.assign(
      {},
      task,
      { done: resultDone }
    );
    const body = { task: task.id };
    const req = buildReq(body);
    const resOverrides = {
      json: jest.fn(() => ({ task: resultTask }))
    };
    const res = buildRes(resOverrides);
    await controller.toggleDone(req, res);

    expect(DI.em.findOne).toHaveBeenCalled();
    expect(DI.em.findOne).toHaveReturnedWith(task);

    expect(res.json).toHaveReturnedWith({ task: resultTask });
  });
});

describe('deleting task', () => {
  const task = buildTask();
  let DI: DIinterface;
  let controller: { deleteTask: any; };

  beforeAll(async () => {
    const emOverrides = {
      getReference: jest.fn(() => task)
    };
    const dbInit = buildDbInit(emOverrides);
    DI = await dbInit();
    controller = createTaskCtrl(DI);
  });

  it('deletes the task', async () => {
    const body = { id: task.id };
    const req = buildReq(body);
    const resOverrides = {
      json: jest.fn(() => ({ task }))
    };
    const res = buildRes(resOverrides);
    await controller.deleteTask(req, res);

    expect(DI.em.getReference).toHaveBeenCalled();
    expect(DI.em.getReference).toHaveReturnedWith(task);

    expect(DI.em.remove).toHaveBeenCalled();

    expect(res.json).toHaveReturnedWith({ task });
  });
});
