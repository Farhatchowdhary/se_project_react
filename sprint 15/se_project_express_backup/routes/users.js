import express from 'express';
import { getUsers, getCurrentUser, createUser,login, updateCurrentUser } from '../controllers/users.js'; // ✅ matches controllers/users.js
import  {auth}  from '../middlewares/auth.js';


const router = express.Router();

// These routes don't need auth middleware;
router.post('/signup', createUser);
router.post('/signin', login);

// These routes need auth middleware; 
router.get("/me",auth, getCurrentUser);
router.patch('/me', auth, updateCurrentUser);

export default router;
