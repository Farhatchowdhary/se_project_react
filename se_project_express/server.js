import express from 'express';
import itemsRoute from './routes/items.js';
import usersRoute from './routes/users.js';
import cors from 'cors';
import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Mount routes
app.use('/items', itemsRoute);
app.use('/users', usersRoute);

app.get('/', (req, res) => res.send('Server is running!'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
