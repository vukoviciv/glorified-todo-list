import * as ctrl from './auth.controller';
import { Router } from 'express';

const router = Router();

router
  .post('/login', ctrl.login)
  .post('/register', ctrl.register)
  .post('/logout', ctrl.logout)
  .patch('/update-password', ctrl.updatePassword); // rename route to password - patch implies update!

export default {
  path: '/auth',
  router
};
