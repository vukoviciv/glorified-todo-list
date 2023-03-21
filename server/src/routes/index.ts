import { authorize } from './middlewares/auth';
import { DIinterface } from '../database';
import { Router } from 'express';
import { RouterService } from './routerService';

export default function initRouter(db: DIinterface) {
  const router = Router();
  const { auth, user, tasks } = RouterService(db, router);

  router.use(auth.path, auth.router);
  router.use(authorize);
  router.use(tasks.path, tasks.router);
  router.use(user.path, user.router);

  return router;
}
