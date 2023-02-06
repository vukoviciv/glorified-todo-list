import auth from './auth/index';
import { authorize } from './middlewares/auth';
import { Router } from 'express';
import task from './task/index';

const router = Router();

router.use(auth.path, auth.router);
router.use(authorize);
router.use(task.path, task.router);

export default router;
