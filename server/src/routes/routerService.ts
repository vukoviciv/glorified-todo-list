import { createAuthRouter } from './auth';
import { createTasksRouter } from './tasks';
import { createUserRouter } from './users';
import { DIinterface } from '../database';
import { Router } from 'express';

export const RouterService = (db: DIinterface, router: Router) => {
  const authRouter = createAuthRouter(db, router);
  const tasksRouter = createTasksRouter(db, router);
  const userRouter = createUserRouter(db, router);

  return {
    auth: authRouter,
    user: userRouter,
    tasks: tasksRouter
  };
};
