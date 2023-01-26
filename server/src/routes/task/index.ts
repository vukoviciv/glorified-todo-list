import { create, list, update } from './task.controller';
import { Router } from 'express';

const router = Router();

router
  .get('/', list)
  .post('/', create)
  .patch('/', update); // send id in params?

export default {
  path: '/task',
  router
};
