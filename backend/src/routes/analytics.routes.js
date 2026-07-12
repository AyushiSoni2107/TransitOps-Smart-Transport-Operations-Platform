import { Router } from 'express';
import Driver from '../models/Driver.js';
import FuelLog from '../models/FuelLog.js';
import MaintenanceRecord from '../models/MaintenanceRecord.js';
import Trip from '../models/Trip.js';
import Vehicle from '../models/Vehicle.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

function monthLabel(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return 'Unknown';
  }
  return date.toLocaleString('en-US', { month: 'short' });
}

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const [vehicles, drivers, trips, fuelLogs, maintenanceRecords] = await Promise.all([
      Vehicle.find().lean(),
      Driver.find().sort({ safetyScore: -1 }).lean(),
      Trip.find().lean(),
      FuelLog.find().lean(),
      MaintenanceRecord.find().lean()
    ]);

    const completedTrips = trips.filter((trip) => trip.status === 'Completed').length;
    const activeVehicles = vehicles.filter((vehicle) => vehicle.status !== 'Maintenance').length;
    const utilization = vehicles.length ? Math.round((activeVehicles / vehicles.length) * 100) : 0;
    const avgDriverScore = drivers.length
      ? (drivers.reduce((sum, driver) => sum + driver.safetyScore, 0) / drivers.length).toFixed(1)
      : '0.0';
    const totalFuelCost = fuelLogs.reduce((sum, log) => sum + log.cost, 0);
    const maintenanceCost = maintenanceRecords.reduce((sum, record) => sum + record.cost, 0);
    const totalLiters = fuelLogs.reduce((sum, log) => sum + log.liters, 0);
    const tripDistance = trips.reduce((sum, trip) => {
      const value = Number.parseFloat(String(trip.distance).replace(/[^\d.]/g, ''));
      return Number.isFinite(value) ? sum + value : sum;
    }, 0);

    const monthlyTrips = Object.values(
      trips.reduce((acc, trip) => {
        const label = monthLabel(trip.date);
        acc[label] ||= { month: label, trips: 0, completed: 0 };
        acc[label].trips += 1;
        if (trip.status === 'Completed') {
          acc[label].completed += 1;
        }
        return acc;
      }, {})
    );

    const monthlyFuel = Object.values(
      fuelLogs.reduce((acc, log) => {
        const label = monthLabel(log.date);
        acc[label] ||= { month: label, liters: 0, cost: 0 };
        acc[label].liters += log.liters;
        acc[label].cost += log.cost;
        return acc;
      }, {})
    );

    res.json({
      data: {
        metrics: {
          fleetUtilization: utilization,
          avgFuelEfficiency: totalLiters ? Number((tripDistance / totalLiters).toFixed(1)) : 0,
          maintenanceCost,
          totalFuelCost,
          completedTrips,
          driverPerformance: Number(avgDriverScore)
        },
        monthlyTrips,
        monthlyFuel,
        driverPerformance: drivers.map((driver) => ({
          name: driver.name,
          score: driver.safetyScore,
          trips: driver.totalTrips
        })),
        vehicleUtilization: vehicles.map((vehicle) => ({
          name: vehicle.model,
          value: vehicle.status === 'Maintenance' ? 45 : vehicle.status === 'In Trip' ? 90 : 72
        }))
      }
    });
  })
);

export default router;
