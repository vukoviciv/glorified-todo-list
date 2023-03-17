import { DIinterface } from '../../database';
import { makeCreateCtrl } from './task.controller';
import { parseParamId } from '../middlewares';
import { Router } from 'express';

export const makeCreateTasksRouter = (db: DIinterface) => (router: Router) => {
  const ctrl = makeCreateCtrl(db);

  router
    .get('/', ctrl.list)
    .post('/', ctrl.create)
    .param('id', parseParamId)
    .patch('/:id', ctrl.update)
    .delete('/:id', ctrl.deleteTask)
    .patch('/:id/toggle', ctrl.toggleDone);

  return {
    path: '/tasks',
    router
  };
};
