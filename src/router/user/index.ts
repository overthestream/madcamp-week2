import express from 'express';
import { login, putMBTI, spinner } from './controller';

const router = express.Router();

router.get('/spinner', spinner);
router.get('/oauth', login);
router.put('/mbti', putMBTI);

export default router;
