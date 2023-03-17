import auth from './auth/index';
import { authorize } from './middlewares/auth';
import { DIinterface } from '../database';
import { makeCreateTasksRouter } from './tasks/index';
import { makeCreateUserRouter } from './users/index';
import { Router } from 'express';

export const makeRouter = (db: DIinterface) => {
  const router = Router();

  router.use(auth.path, auth.router);
  router.use(authorize);
  const createTasksRouter = makeCreateTasksRouter(db);
  const tasksRouter = createTasksRouter(router);
  router.use(tasksRouter.path, tasksRouter.router);

  const createUserRouter = makeCreateUserRouter(db);
  const userRouter = createUserRouter(router);
  router.use(userRouter.path, userRouter.router);

  return router;
};
