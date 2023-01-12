import ctrl from './task.controller.js';
import Router from 'express-promise-router';

const router = Router();

router.get('/', ctrl.getTasks);

export default {
  path: '/task',
  router
};
