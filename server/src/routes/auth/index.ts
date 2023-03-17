import { createAuthCtrl } from './auth.controller';
import { DIinterface } from '../../database';
import { Router } from 'express';

export const createAuthRouter = (db: DIinterface, router: Router) => {
  const ctrl = createAuthCtrl(db);

  router
    .post('/login', ctrl.login)
    .post('/register', ctrl.register)
    .post('/logout', ctrl.logout)
    .patch('/update-password', ctrl.updatePassword); // rename route to password - patch implies update!

  return {
    path: '/auth',
    router
  };
};
