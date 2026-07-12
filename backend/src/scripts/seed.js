import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Alert from '../models/Alert.js';
import Driver from '../models/Driver.js';
import FuelLog from '../models/FuelLog.js';
import MaintenanceRecord from '../models/MaintenanceRecord.js';
import Trip from '../models/Trip.js';
import Vehicle from '../models/Vehicle.js';
import { connectDatabase } from '../config/database.js';
import {
  alerts,
  drivers,
  fuelLogs,
  maintenanceRecords,
  trips,
  vehicles
} from '../data/seedData.js';

dotenv.config();

async function resetCollection(Model, records) {
  await Model.deleteMany({});
  await Model.insertMany(records);
}

async function seed() {
  await connectDatabase();

  await Promise.all([
    resetCollection(Vehicle, vehicles),
    resetCollection(Driver, drivers),
    resetCollection(Trip, trips),
    resetCollection(Alert, alerts),
    resetCollection(MaintenanceRecord, maintenanceRecords),
    resetCollection(FuelLog, fuelLogs)
  ]);

  console.log('TransitOps seed data loaded');
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error('Failed to seed database:', error.message);
  await mongoose.disconnect();
  process.exit(1);
});
