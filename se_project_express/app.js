import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import usersRoute from './routes/users.js'; // make sure this matches your export
import { login, createUser } from './controllers/users.js'; 
import errorHandler from './utils/errors.js';
import itemsRoute from './routes/items.js';

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


// signup and signin routes
// app.post('/signup', createUser);
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

// app.get('/', (req, res) => {
//   res.send('Server is running!');
// });


// Handle non-existent resources
app.use((req, res) => {
  res.status(404).json({ message: 'Requested resource not found' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;

