import express from 'express';
import { addFriend, deleteFriend, getFriend, getTalk } from './controller';

const router = express.Router();

router.get('/get', getFriend);
router.post('/add', addFriend);
router.delete('/delete', deleteFriend);
router.get('/talk', getTalk);

export default router;
