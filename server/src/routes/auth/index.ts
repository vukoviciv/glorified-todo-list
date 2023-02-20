import { login, logout, register } from './auth.controller';
import { Router } from 'express';

const router = Router();

router
  .post('/login', login)
  .post('/register', register)
  .post('/logout', logout);

export default {
  path: '/auth',
  router
};
