import auth from './auth/index';
import { getUser } from './middlewares/task';
import { Router } from 'express';
import task from './task/index';

const router = Router();

router.use(auth.path, auth.router);
router.use(getUser); // TODO: this will be auth mid
router.use(task.path, task.router);

export default router;
