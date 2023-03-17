import * as ctrl from './user.controller';
import { DIinterface } from '../../database';
import { Router } from 'express';

export const makeCreateUserRouter = (db: DIinterface) => (router: Router) => {
  // const ctrl = makeCtrl(db);

  router
    .get('/', ctrl.list)
    .get('/me', ctrl.getMe)
    .post('/me/accounts', ctrl.createAccounts);

  return {
    path: '/users',
    router
  };
};
