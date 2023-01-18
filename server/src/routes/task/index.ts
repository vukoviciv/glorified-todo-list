import { create, list } from './task.controller';
import { Router } from 'express';

const router = Router();

router
  .get('/', list)
  .get('/test', create);

export default {
  path: '/task',
  router
};
