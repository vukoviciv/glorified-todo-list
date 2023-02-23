import * as ctrl from './user.controller';
import { Router } from 'express';

const router = Router();

router
  .get('/', ctrl.list)
  .get('/me', ctrl.getMe);

export default {
  path: '/users',
  router
};
