import { login, logout } from './auth.controller';
import { Router } from 'express';

const router = Router();

router
  .post('/login', login)
  .post('/logout', logout);

export default {
  path: '/auth',
  router
};
