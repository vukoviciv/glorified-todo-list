import auth from './auth/index';
import { Router } from 'express';
import task from './task/index';

const router = Router();

router.use(auth.path, auth.router);
router.use(task.path, task.router);

export default router;
