import { create, list, update } from './task.controller';
import { Router } from 'express';

const router = Router();

router
  .get('/', list)
  .post('/', create)
  .patch('/', update);

export default {
  path: '/task',
  router
};
