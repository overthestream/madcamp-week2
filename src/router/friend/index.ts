import express from 'express';
import { addFriend, getFriend, getTalk } from './controller';

const router = express.Router();

router.get('/get', getFriend);
router.post('/add', addFriend);
router.get('/talk', getTalk);

export default router;
