import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../utils/config.js';

export const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({error: "No credentials sent"});
  } 
  const token = req.headers.authorization.replace("Bearer ", "")
  jwt.verify(token, JWT_SECRET,  (err, user) => {
    if (err)  {
        return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};