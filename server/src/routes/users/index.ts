import * as ctrl from './user.controller';
import { Router } from 'express';

const router = Router();

router
  .get('/', ctrl.list)
  .get('/me', ctrl.getMe)
  .post('/me/accounts', ctrl.createAccounts);

export default {
  path: '/users',
  router
};
