import express from 'express';
import dotenv from 'dotenv';
import taskRoutes from './routes/task.routes';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

export default app;
