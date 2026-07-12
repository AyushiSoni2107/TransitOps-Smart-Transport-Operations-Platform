export type Page = 
  | 'login'
  | 'signup'
  | 'dashboard'
  | 'fleet'
  | 'drivers'
  | 'trips'
  | 'maintenance'
  | 'fuel'
  | 'analytics'
  | 'settings';

export type Role = 'Fleet Manager' | 'Dispatcher' | 'Safety Officer' | 'Financial Analyst';

export interface AuthUser {
  id: string;
  name: string;
  company: string;
  email: string;
  role: Role;
}

export type VehicleStatus = 'Available' | 'In Trip' | 'Maintenance';
export type DriverStatus = 'On Duty' | 'Off Duty' | 'On Trip' | 'Suspended';

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  type: string;
  year: number;
  capacity: number;
  status: VehicleStatus;
  driver?: string;
  mileage: number;
  fuelLevel: number;
  lastService: string;
}

export interface Driver {
  id: string;
  name: string;
  license: string;
  licenseExpiry: string;
  phone: string;
  status: DriverStatus;
  safetyScore: number;
  assignedVehicle?: string;
  totalTrips: number;
  avatar: string;
}

export interface Trip {
  id: string;
  origin: string;
  destination: string;
  driver: string;
  vehicle: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  date: string;
  duration: string;
  distance: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  message: string;
  time: string;
  vehicle?: string;
}
