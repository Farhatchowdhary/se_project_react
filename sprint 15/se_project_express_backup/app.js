import dotenv from 'dotenv';
import path from 'path';
dotenv.config(); 


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { errors } from 'celebrate';

import usersRoute from './routes/users.js';
import itemsRoute from './routes/items.js';
// import { login, createUser } from './controllers/users.js';
// import errorHandler from './middlewares/error-handler.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

// ES Module path fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env explicitly
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Debug env vars
console.log("ENV file path:", path.join(__dirname, '.env'));
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to local MongoDB');
  // Start server only after DB connects
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});


// Middlewares
app.use(express.json());

// CORS: allow requests from frontend
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-domain.com'], // add your deployed frontend URL
  credentials: true,
}));

app.use(requestLogger);

// === API ROUTES ===
// app.post('/api/signup', createUser);
// app.post('/api/signin', login);
app.use('/api/users', usersRoute);
app.use('/api/items', itemsRoute);

// Crash test
app.get('/crash-test', (req, res) => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// Handle 404 for API
app.use('/api/*', (req, res) => {
  res.status(404).json({ status: 'error', message: 'API endpoint not found' });
});

// Serve frontend
app.use(express.static(path.join(__dirname, 'client_build', 'dist')));
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'client_build', 'dist', 'index.html'));
  }
});

// Error handling middlewares
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error',
  });
});

