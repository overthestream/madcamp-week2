import express from 'express';
import { addFriend, deleteFriend, saveTalk } from './controller';

const router = express.Router();

router.post('/add', addFriend);
router.delete('/delete', deleteFriend);
router.post('/send', saveTalk);

export default router;

//http://192.249.18
