import { create, list, toggleDone, update } from './task.controller';
import { getAccount } from '../middlewares';
import { Router } from 'express';

const router = Router();

router
  .use(getAccount)
  .get('/', list)
  .post('/', create)
  .patch('/:id', update)
  .patch('/:id/toggle', toggleDone);

export default {
  path: '/tasks',
  router
};
