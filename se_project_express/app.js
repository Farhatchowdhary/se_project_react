import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { errors } from 'celebrate';

import usersRoute from './routes/users.js';
import itemsRoute from './routes/items.js';
import { login, createUser } from './controllers/users.js';
import errorHandler from './middlewares/error-handler.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

// Set up path resolution for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Debugging environment variables
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
console.log('🔍 All env vars:', Object.keys(process.env).filter(key => key.includes('MONGO')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Middlewares
app.use(express.json());
app.use(cors());
app.use(requestLogger);

// === API ROUTES ===
app.post('/api/signup', (req, res) => createUser(req, res));
app.post('/api/signin', login);
app.use('/api/users', usersRoute);
app.use('/api/items', itemsRoute);

// Crash test
app.get('/crash-test', (req, res) => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// Handle 404 for API routes only
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// === FRONTEND ===
// Serve Vite build folder
app.use(express.static(path.join(__dirname, 'client_build', 'dist')));

// Serve React index.html for all non-API routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'client_build', 'dist', 'index.html'));
  }
});

// Error handling middleware
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
