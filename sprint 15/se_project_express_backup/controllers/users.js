// controllers/users.js

import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/config.js';
import { BadRequestError } from '../errors/BadRequestError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { ConflictError } from '../errors/ConflictError.js';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';
import { ForbiddenError } from '../errors/ForbiddenError.js';

// ✅ GET /users — return all users
export const getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => next(err));
};

// ✅ GET /users/me — return current authenticated user
export const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) throw new NotFoundError('User not found');
      res.status(200).json(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid user ID format'));
      } else {
        next(err);
      }
    });
};

// ✅ PATCH /users/me — update current authenticated user
export const updateCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(userId, { name, avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) throw new NotFoundError('User not found');
      res.status(200).json(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid data provided'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Invalid user ID format'));
      } else {
        next(err);
      }
    });
};

// ✅ POST /users — create a new user
export const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!name || !avatar || !email || !password) {
    return next(new BadRequestError('Name, avatar, email and password are required'));
  }

  bcrypt.hash(password, 10)
    .then((hashedPassword) =>
      User.create({
        name,
        avatar,
        email,
        password: hashedPassword,
      })
    )
    .then((user) => {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Email already exists'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid data provided'));
      } else {
        next(err);
      }
    });
};

// ✅ POST /login — login user and return JWT
export const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Invalid email or password'));
    });
};
