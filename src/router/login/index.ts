import express from 'express';

const controller = require('./controller')

const router = express.Router();

router.get('/oauth/:code', controller.login);

export default router;
