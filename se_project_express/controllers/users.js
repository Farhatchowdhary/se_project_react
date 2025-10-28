import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '../utils/config.js';
import jwt from 'jsonwebtoken';

// GET /users — return all users
export const getUsers = (req, res) => {
    User.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    });
};

// Get/users/me - return current authenticated user
export const getCurrentUser = (req, res,) => {
  const userId  = req.user._id;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    });
};

// PATCH/users/me - update current authenticated user
export const updateCurrentUser = (req, res) => {
const userId  = req.user._id;

 const updateData = {
  name: req.body.name,
  avatar: req.body.avatar,
}

const options = {
   new: true,
  runValidators: true
}

  return User.findByIdAndUpdate(userId, updateData, options)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err);

      if (err.name === 'ValidationError')  {
        return res.status(400).json({ message: 'Invalid data provided'});
      } else if (err.name === 'DocumentNotFoundError')  {
        return res.status(404).json({ message: 'User not found'});
      } else  if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid user ID format'});
      } else  {
        return res.status(500).json({ message: 'An error has occurred on the server' });
      }
    });
}; 


// POST /users — create a new user
export const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  // ✅ Validate required fields
  if (!name || !avatar || !email || !password) {
    return res.status(400).json({ message: 'Name, avatar, email and password are required' });
  }

  // Hash the password before saving
  return bcrypt.hash(password, 10)
  .then((hashedPassword) => {
    return User.create({
      name,
      avatar,
      email,
      password: hashedPassword
    });
  })
  .then((user) => {
    // Return user data (excluding password)
   res.status(201).json({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      });
  })
 .catch((err) => {
      console.error(err);
    // Handle duplicate email error (MongoDB error code 11000)
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Handle validation errors
    if (err.name === "ValidationError")  {
      return res.status(400).json({ message: err.message });
    };

  // Handle other server errors
      res.status(500).json({ message: 'Server error' });
    });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
  .then((user) => {
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    // send the token back to the client
    res.send({ token });
  })
  .catch((err) => {
    res.status(401).send({ message: "Incorrect email or password" });
  });
};


