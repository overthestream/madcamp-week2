import express from 'express';
import { addFriend, deleteFriend, getFriend, saveTalk } from './controller';

const router = express.Router();

router.get('/get', getFriend);
router.post('/add', addFriend);
router.delete('/delete', deleteFriend);
router.post('/send', saveTalk);

export default router;
