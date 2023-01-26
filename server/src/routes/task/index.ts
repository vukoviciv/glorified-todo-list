import { create, list, update } from './task.controller';
import { getAccount } from '../middlewares';
import { Router } from 'express';

const router = Router();

router
  .use(getAccount)
  .get('/', list)
  .post('/', create)
  .patch('/', update); // send id in params?

export default {
  path: '/task',
  router
};
