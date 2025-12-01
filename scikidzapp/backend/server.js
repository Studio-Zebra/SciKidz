import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import { connectDB } from './config/db.js'

import userRoutes from './routes/userRoutes.js'
import progressRoutes from './routes/progressRoutes.js'
import lessonRoutes from './routes/lessonRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

//test
app.get('/', (req, res) => res.send('Backend API running!'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/lessons', lessonRoutes);

const PORT = process.env.PORT || 5757
app.listen(5757, () => console.log('Server running on port 5757'));