import express from 'express';

const controller = require('./controller')

const router = express.Router();

router.get('/login/:code', controller.login);

export default router;
