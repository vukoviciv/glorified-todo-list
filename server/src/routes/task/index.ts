import * as ctrl from './task.controller';
import { getAccount, parseParamId } from '../middlewares';
import { Router } from 'express';

const router = Router();

router
  .use(getAccount)
  .get('/', ctrl.list)
  .post('/', ctrl.create)
  .param('id', parseParamId)
  .patch('/:id', ctrl.update)
  .patch('/:id/toggle', ctrl.toggleDone);

export default {
  path: '/tasks',
  router
};
