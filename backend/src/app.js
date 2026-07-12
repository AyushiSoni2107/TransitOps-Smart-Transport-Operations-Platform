import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import healthRoutes from './routes/health.routes.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'TransitOps API is running' });
});

app.use('/api/health', healthRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    message: error.message || 'Internal server error'
  });
});

export default app;
