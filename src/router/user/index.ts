import express from 'express';
import { login, putMBTI } from './controller';

const router = express.Router();

router.get('/oauth/callback/kakao', login)
router.put('/mbti', putMBTI);

export default router;
