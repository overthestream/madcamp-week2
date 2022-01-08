import express from 'express';
import { login, putMBTI } from './controller';

const router = express.Router();

router.get('/oauth/:code', login);
router.put('/mbti', putMBTI);

export default router;
