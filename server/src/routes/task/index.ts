import { list } from './task.controller';
import { Router } from 'express';

const router = Router();

router.get('/', list);

export default {
  path: '/task',
  router
};
