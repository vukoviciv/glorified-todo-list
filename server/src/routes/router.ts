import auth from './auth/index';
import { authorize } from './middlewares/auth';
import { Router } from 'express';
import tasks from './tasks/index';
import users from './users/index';

const router = Router();

router.use(auth.path, auth.router);
router.use(authorize);
router.use(tasks.path, tasks.router);
router.use(users.path, users.router);

export default router;
