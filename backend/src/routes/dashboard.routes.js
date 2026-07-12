import { Router } from 'express';
import Alert from '../models/Alert.js';
import Driver from '../models/Driver.js';
import FuelLog from '../models/FuelLog.js';
import MaintenanceRecord from '../models/MaintenanceRecord.js';
import Trip from '../models/Trip.js';
import Vehicle from '../models/Vehicle.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { cleanMongoId } from '../utils/cleanMongo.js';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const [
      totalVehicles,
      activeVehicles,
      maintenanceVehicles,
      totalDrivers,
      activeDrivers,
      ongoingTrips,
      recentTrips,
      recentAlerts,
      vehicleStatuses,
      fuelLogs,
      scheduledMaintenance
    ] = await Promise.all([
      Vehicle.countDocuments(),
      Vehicle.countDocuments({ status: { $in: ['Available', 'In Trip'] } }),
      Vehicle.countDocuments({ status: 'Maintenance' }),
      Driver.countDocuments(),
      Driver.countDocuments({ status: { $in: ['On Duty', 'On Trip'] } }),
      Trip.countDocuments({ status: 'In Progress' }),
      Trip.find().sort({ date: -1, id: -1 }).limit(6).lean(),
      Alert.find().sort({ createdAt: -1 }).limit(5).lean(),
      Vehicle.aggregate([{ $group: { _id: '$status', value: { $sum: 1 } } }]),
      FuelLog.find().sort({ date: -1 }).limit(200).lean(),
      MaintenanceRecord.countDocuments({ status: { $in: ['Scheduled', 'Approved', 'In Progress'] } })
    ]);

    const totalLiters = fuelLogs.reduce((sum, log) => sum + log.liters, 0);
    const estimatedDistance = recentTrips.reduce((sum, trip) => {
      const value = Number.parseFloat(String(trip.distance).replace(/[^\d.]/g, ''));
      return Number.isFinite(value) ? sum + value : sum;
    }, 0);
    const fuelEfficiency = totalLiters ? (estimatedDistance / totalLiters).toFixed(1) : '0.0';
    const utilization = totalVehicles ? Math.round((activeVehicles / totalVehicles) * 100) : 0;

    res.json({
      data: {
        kpis: {
          totalVehicles,
          activeVehicles,
          maintenanceVehicles,
          totalDrivers,
          activeDrivers,
          ongoingTrips,
          scheduledMaintenance,
          fuelEfficiency,
          fleetUtilization: utilization
        },
        vehicleStatus: vehicleStatuses.map((item) => ({
          label: item._id,
          value: item.value
        })),
        recentTrips: cleanMongoId(recentTrips),
        recentAlerts: cleanMongoId(recentAlerts)
      }
    });
  })
);

export default router;
