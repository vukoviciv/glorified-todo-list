import { createAuthCtrl } from './auth.controller';
import { DIinterface } from '../../database';
import { Router } from 'express';

export const createAuthRouter = (db: DIinterface, router: Router) => {
  const ctrl = createAuthCtrl(db);

  router
    .post('/login', ctrl.login)
    .post('/register', ctrl.register)
    .post('/logout', ctrl.logout)
    .patch('/password', ctrl.updatePassword);

  return {
    path: '/auth',
    router
  };
};
