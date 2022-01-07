import express from 'express';
import loginRouter from './login/index'

const router = express.Router();

router.use('/oauth', loginRouter);

export default router;
