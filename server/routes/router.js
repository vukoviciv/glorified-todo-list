import express from 'express';
import task from './task/index.js';

const router = express.Router();

router.use(task.path, task.router);

export default router;
