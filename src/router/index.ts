import express from 'express';
import userRouter from './user/index';
import friendRouter from './friend/index';

const router = express.Router();

router.use('/user', userRouter);
router.use('/friend', friendRouter);

export default router;
