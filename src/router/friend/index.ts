import express from 'express';
import { addFriend, deleteFriend } from './controller';

const router = express.Router();

router.post('/add', addFriend);
router.delete('/delete', deleteFriend);

export default router;
