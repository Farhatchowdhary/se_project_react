import express from 'express';
import itemsRoute from './items.js';

const router = express.Router();
router.use('/items', itemsRoute);

export default router;
