import express from 'express';
import loginRouter from './user/index';

const router = express.Router();

router.use('/user', loginRouter);

export default router;
