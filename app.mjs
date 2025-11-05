import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import usersRoute from './routes/users.js'; // make sure this matches your export
import { login, createUser } from './controllers/users.js';
import itemsRoute from './routes/items.js';
import errorHandler from './middlewares/error-handler.js';
import { requestLogger, errorLogger } from "./middlewares/logger.js";
import { validateCardBody } from './middlewares/validation.js';
import { errors } from "celebrate";


console.log('itemsRoute:', itemsRoute);
console.log('usersRoute:', usersRoute);
console.log('errorHandler:', errorHandler);
console.log('itemsRoute type:', typeof itemsRoute);
console.log('itemsRoute value:', itemsRoute);

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Add request logger HERE (before routes)
app.use(requestLogger);

// signup and signin routes
app.post('/signup', (req, res) => {
  console.log('🔥 Signup route hit!', req.body);
  createUser(req, res);
});

app.post('/test', (req, res) => {
  console.log('🧪 Test route hit!');
  res.json({ message: 'Test route working!' });
});
app.post('/signin', login);

// Routes
app.use('/users', usersRoute);
app.use('/items', itemsRoute);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// Quick GET route for browser test
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});


// Handle non-existent resources
app.use((req, res) => {
  res.status(404).json({ message: 'Requested resource not found' });
});

// Add error logger HERE (after routes, before error handlers)
app.use(errorLogger);

// Add celebrate error handler HERE (before your custom error handler)
app.use(errors());

// Error handling middleware
app.use(errorHandler);

// Start server


app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});

export default app;

