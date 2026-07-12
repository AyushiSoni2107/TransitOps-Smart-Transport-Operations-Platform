import { Vehicle, Driver, Trip, Alert } from '../types';

export const vehicles: Vehicle[] = [
  { id: 'V001', plate: 'AU7584893', model: 'TRUCK-8', type: 'Truck', year: 2021, capacity: 800, status: 'Available', mileage: 142000, fuelLevel: 78, lastService: '2024-06-01' },
  { id: 'V002', plate: 'AU7589990', model: 'TRUCK-3', type: 'Truck', year: 2020, capacity: 600, status: 'In Trip', driver: 'Alex Carter', mileage: 98400, fuelLevel: 45, lastService: '2024-05-15' },
  { id: 'V003', plate: 'AU8502931', model: 'MICRO-05', type: 'Van', year: 2022, capacity: 200, status: 'Maintenance', mileage: 55200, fuelLevel: 20, lastService: '2024-04-30' },
  { id: 'V004', plate: 'AU4000841', model: 'VAN-06', type: 'Van', year: 2023, capacity: 350, status: 'Available', mileage: 22100, fuelLevel: 92, lastService: '2024-06-10' },
  { id: 'V005', plate: 'KL3920112', model: 'BUS-12', type: 'Bus', year: 2019, capacity: 1200, status: 'In Trip', driver: 'Maria Chen', mileage: 210000, fuelLevel: 60, lastService: '2024-03-20' },
  { id: 'V006', plate: 'KL7731004', model: 'TRUCK-2', type: 'Truck', year: 2022, capacity: 500, status: 'Available', mileage: 67800, fuelLevel: 85, lastService: '2024-05-28' },
];

export const drivers: Driver[] = [
  { id: 'D001', name: 'Alex Carter', license: 'LIC-99120', licenseExpiry: '2025-03-15', phone: '+1-555-0101', status: 'On Trip', safetyScore: 98, assignedVehicle: 'TRUCK-3', totalTrips: 342, avatar: 'AC' },
  { id: 'D002', name: 'Maria Chen', license: 'LIC-77654', licenseExpiry: '2024-11-30', phone: '+1-555-0102', status: 'On Trip', safetyScore: 94, assignedVehicle: 'BUS-12', totalTrips: 519, avatar: 'MC' },
  { id: 'D003', name: 'James Okonkwo', license: 'LIC-44321', licenseExpiry: '2026-07-22', phone: '+1-555-0103', status: 'On Duty', safetyScore: 87, assignedVehicle: 'VAN-06', totalTrips: 201, avatar: 'JO' },
  { id: 'D004', name: 'Priya Patel', license: 'LIC-55891', licenseExpiry: '2025-01-08', phone: '+1-555-0104', status: 'Off Duty', safetyScore: 96, totalTrips: 415, avatar: 'PP' },
  { id: 'D005', name: 'Sam Rivera', license: 'LIC-22143', licenseExpiry: '2024-09-01', phone: '+1-555-0105', status: 'Suspended', safetyScore: 61, totalTrips: 89, avatar: 'SR' },
  { id: 'D006', name: 'Lena Müller', license: 'LIC-88760', licenseExpiry: '2026-12-31', phone: '+1-555-0106', status: 'On Duty', safetyScore: 99, assignedVehicle: 'TRUCK-8', totalTrips: 730, avatar: 'LM' },
];

export const trips: Trip[] = [
  { id: 'TR006', origin: 'Main Depot', destination: 'Warehouse B', driver: 'Alex Carter', vehicle: 'TRUCK-3', status: 'In Progress', date: '2024-07-12', duration: '2h 30m', distance: '84 km' },
  { id: 'TR005', origin: 'Hamburger Depot', destination: 'Disneyland Hub', driver: 'Maria Chen', vehicle: 'BUS-12', status: 'In Progress', date: '2024-07-12', duration: '4h 15m', distance: '142 km' },
  { id: 'TR004', origin: 'Main Depot', destination: 'Downtown Station', driver: 'James Okonkwo', vehicle: 'VAN-06', status: 'Completed', date: '2024-07-11', duration: '1h 10m', distance: '38 km' },
  { id: 'TR003', origin: 'Airport Hub', destination: 'Industrial Zone', driver: 'Lena Müller', vehicle: 'TRUCK-8', status: 'Completed', date: '2024-07-11', duration: '3h 00m', distance: '116 km' },
  { id: 'TR002', origin: 'North Terminal', destination: 'Central Market', driver: 'Priya Patel', vehicle: 'VAN-06', status: 'Completed', date: '2024-07-10', duration: '55m', distance: '22 km' },
  { id: 'TR001', origin: 'South Depot', destination: 'Eastern Freight', driver: 'Sam Rivera', vehicle: 'MICRO-05', status: 'Cancelled', date: '2024-07-09', duration: '—', distance: '—' },
];

export const alerts: Alert[] = [
  { id: 'A001', type: 'error', message: 'MICRO-05 overdue for service — 2,400 km past due', time: '2 min ago', vehicle: 'MICRO-05' },
  { id: 'A002', type: 'warning', message: 'Driver Sam Rivera license expiring in 52 days', time: '15 min ago' },
  { id: 'A003', type: 'warning', message: 'BUS-12 fuel level critical — 20% remaining', time: '1h ago', vehicle: 'BUS-12' },
  { id: 'A004', type: 'info', message: 'Trip TR006 dispatched successfully', time: '2h ago' },
  { id: 'A005', type: 'success', message: 'Scheduled maintenance for TRUCK-8 completed', time: '3h ago', vehicle: 'TRUCK-8' },
];

export const monthlyTrips = [
  { month: 'Jan', trips: 312, completed: 298 },
  { month: 'Feb', trips: 287, completed: 271 },
  { month: 'Mar', trips: 345, completed: 330 },
  { month: 'Apr', trips: 398, completed: 378 },
  { month: 'May', trips: 421, completed: 408 },
  { month: 'Jun', trips: 389, completed: 374 },
  { month: 'Jul', trips: 203, completed: 196 },
];

export const fuelData = [
  { month: 'Jan', liters: 4200, cost: 6300 },
  { month: 'Feb', liters: 3980, cost: 5970 },
  { month: 'Mar', liters: 4510, cost: 6765 },
  { month: 'Apr', liters: 4750, cost: 7125 },
  { month: 'May', liters: 4320, cost: 6480 },
  { month: 'Jun', liters: 4100, cost: 6150 },
  { month: 'Jul', liters: 2200, cost: 3300 },
];
