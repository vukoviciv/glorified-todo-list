import { authorize } from './middlewares/auth';
import { DIinterface } from '../database';
import { makeCreateAuthRouter } from './auth';
import { makeCreateTasksRouter } from './tasks';
import { makeCreateUserRouter } from './users';
import { Router } from 'express';

export default function initRouter(db: DIinterface) {
  const router = Router();

  const createAuthRouter = makeCreateAuthRouter(db);
  const authRouter = createAuthRouter(router);
  router.use(authRouter.path, authRouter.router);
  router.use(authorize);

  const createTasksRouter = makeCreateTasksRouter(db);
  const tasksRouter = createTasksRouter(router);
  router.use(tasksRouter.path, tasksRouter.router);

  const createUserRouter = makeCreateUserRouter(db);
  const userRouter = createUserRouter(router);
  router.use(userRouter.path, userRouter.router);

  return router;
}
