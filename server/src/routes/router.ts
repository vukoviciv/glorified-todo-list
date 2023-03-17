import auth from './auth/index';
import { authorize } from './middlewares/auth';
import { DIinterface } from '../database';
import { makeCreateUserRouter } from './users/index';
import { Router } from 'express';
import tasks from './tasks/index';

export const makeRouter = (db: DIinterface) => {
  const router = Router();

  router.use(auth.path, auth.router);
  router.use(authorize);
  router.use(tasks.path, tasks.router);

  const createUserRouter = makeCreateUserRouter(db);
  const userRouter = createUserRouter(router);
  router.use(userRouter.path, userRouter.router);

  return router;
};
