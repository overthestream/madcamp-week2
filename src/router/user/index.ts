import express from 'express';
import { login, putMBTI, spinner, putNickName } from './controller';

const router = express.Router();

router.get('/spinner', spinner);
router.get('/oauth', login);
router.put('/mbti', putMBTI);
router.put('/nickname', putNickName);

export default router;
