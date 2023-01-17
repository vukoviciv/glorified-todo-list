import { Router } from 'express';
import task from './task/index';

const router = Router();

router.use(task.path, task.router);

export default router;
