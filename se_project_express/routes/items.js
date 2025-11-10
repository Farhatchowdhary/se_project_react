// routes/items.js
console.log("✅ itemsRoute file loaded");
console.log("✅ Items route loaded");

import express from 'express';
import  {auth}  from '../middlewares/auth.js';
import {
  getItems, createItem, deleteItem, likeItem, dislikeItem,
} from '../controllers/items.js';

const router = express.Router();

// Public routes without auth
router.get('/', getItems);
// Protected routes with auth middleware
router.delete('/:id', auth, deleteItem);
router.post('/', auth, createItem);
router.put('/:id/likes', auth, likeItem);
router.delete('/:id/likes', auth, dislikeItem);

// Export the router
export default router;

