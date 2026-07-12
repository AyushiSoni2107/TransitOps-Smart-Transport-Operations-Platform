import { Router } from 'express';
import Driver from '../models/Driver.js';
import Trip from '../models/Trip.js';
import Vehicle from '../models/Vehicle.js';
import Alert from '../models/Alert.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createCrudRouter } from '../utils/crudRouter.js';
import { generateBusinessId } from '../utils/idGenerator.js';

const router = createCrudRouter(Trip, {
  idPrefix: 'TR',
  searchFields: ['id', 'origin', 'destination', 'driver', 'vehicle'],
  filterFields: ['status', 'driver', 'vehicle'],
  defaultSort: { date: -1, id: -1 }
});

router.post(
  '/dispatch',
  asyncHandler(async (req, res) => {
    const {
      origin,
      destination,
      driver,
      vehicle,
      routeType = 'Standard Route',
      date = new Date().toISOString().slice(0, 10),
      duration = '-',
      distance = '-'
    } = req.body;

    if (!origin || !destination || !driver || !vehicle) {
      return res.status(400).json({
        message: 'origin, destination, driver, and vehicle are required'
      });
    }

    const [driverRecord, vehicleRecord] = await Promise.all([
      Driver.findOne({ name: driver }),
      Vehicle.findOne({ model: vehicle })
    ]);

    if (!driverRecord) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    if (!vehicleRecord) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const trip = await Trip.create({
      id: await generateBusinessId(Trip, 'TR'),
      origin,
      destination,
      driver,
      vehicle,
      routeType,
      date,
      duration,
      distance,
      status: 'In Progress'
    });

    driverRecord.status = 'On Trip';
    driverRecord.assignedVehicle = vehicle;
    vehicleRecord.status = 'In Trip';
    vehicleRecord.driver = driver;

    await Promise.all([
      driverRecord.save(),
      vehicleRecord.save(),
      Alert.create({
        id: await generateBusinessId(Alert, 'A'),
        type: 'info',
        message: `Trip ${trip.id} dispatched successfully`,
        time: 'just now',
        vehicle
      })
    ]);

    res.status(201).json({ data: trip.toObject() });
  })
);

router.patch(
  '/:id/status',
  asyncHandler(async (req, res) => {
    const { status } = req.body;
    const trip = await Trip.findOneAndUpdate(
      { id: req.params.id },
      { status },
      { new: true, runValidators: true }
    );

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    if (['Completed', 'Cancelled'].includes(status)) {
      await Promise.all([
        Vehicle.findOneAndUpdate({ model: trip.vehicle }, { status: 'Available', driver: undefined }),
        Driver.findOneAndUpdate({ name: trip.driver }, { status: 'On Duty', $inc: { totalTrips: status === 'Completed' ? 1 : 0 } })
      ]);
    }

    res.json({ data: trip.toObject() });
  })
);

export default router;
