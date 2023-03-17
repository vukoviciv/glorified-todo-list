import { DIinterface } from '../../database';
import { makeCreateCtrl } from './user.controller';
import { Router } from 'express';

export const makeCreateUserRouter = (db: DIinterface) => (router: Router) => {
  const ctrl = makeCreateCtrl(db);

  router
    .get('/', ctrl.list)
    .get('/me', ctrl.getMe)
    .post('/me/accounts', ctrl.createAccounts);

  return {
    path: '/users',
    router
  };
};
