import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import alertsRoutes from './routes/alerts.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import authRoutes from './routes/auth.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import driversRoutes from './routes/drivers.routes.js';
import fuelRoutes from './routes/fuel.routes.js';
import healthRoutes from './routes/health.routes.js';
import maintenanceRoutes from './routes/maintenance.routes.js';
import tripsRoutes from './routes/trips.routes.js';
import vehiclesRoutes from './routes/vehicles.routes.js';

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
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/drivers', driversRoutes);
app.use('/api/trips', tripsRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/fuel', fuelRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation failed',
      errors: Object.values(error.errors).map((item) => item.message)
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      message: 'Duplicate value already exists',
      fields: Object.keys(error.keyPattern || {})
    });
  }

  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    message: error.message || 'Internal server error'
  });
});

export default app;
