import { create } from "zustand";

export type Role = "Fleet Manager" | "Dispatcher" | "Safety Officer" | "Financial Analyst";

export interface Vehicle {
  id: string;
  vin: string;
  type: "Van" | "Truck" | "Mini";
  capacityKg: number;
  km: number;
  cost: number;
  status: "Available" | "On Trip" | "In Shop" | "Retired";
}

export interface Driver {
  id: string;
  name: string;
  license: string;
  category: "LMV" | "HMV";
  expiry: string;
  contact: string;
  tripsCompleted: number;
  safetyScore: number;
  status: "Available" | "On Trip" | "Off Duty" | "Suspended";
}

export interface Trip {
  id: string;
  vehicleId: string;
  driverId: string;
  origin: string;
  destination: string;
  cargoKg: number;
  distanceKm: number;
  eta: string;
  status: "Draft" | "Dispatched" | "Completed";
}

export interface ServiceRecord {
  id: string;
  vehicleId: string;
  service: string;
  date: string;
  cost: number;
  status: "In Shop" | "Completed";
}

export interface FuelLog {
  id: string;
  vehicleId: string;
  date: string;
  liters: number;
  cost: number;
}

export interface Expense {
  id: string;
  tripId: string;
  vehicleId: string;
  toll: number;
  other: number;
  total: number;
  status: "Approved" | "Pending";
}

interface Store {
  role: Role | null;
  vehicles: Vehicle[];
  drivers: Driver[];
  trips: Trip[];
  services: ServiceRecord[];
  fuelLogs: FuelLog[];
  expenses: Expense[];
  setRole: (r: Role | null) => void;
  addVehicle: (v: Vehicle) => void;
  updateVehicle: (id: string, patch: Partial<Vehicle>) => void;
  addDriver: (d: Driver) => void;
  addTrip: (t: Trip) => void;
  updateTrip: (id: string, patch: Partial<Trip>) => void;
  addService: (s: ServiceRecord) => void;
  addFuelLog: (f: FuelLog) => void;
  addExpense: (e: Expense) => void;
}

const seedVehicles: Vehicle[] = [
  { id: "VAN-05", vin: "417VAN241", type: "Van", capacityKg: 250, km: 74000, cost: 640000, status: "Available" },
  { id: "TRUCK-8", vin: "417TR2891", type: "Truck", capacityKg: 8000, km: 132200, cost: 2460000, status: "On Trip" },
  { id: "MINI-03", vin: "417MI803", type: "Mini", capacityKg: 1000, km: 44000, cost: 430000, status: "In Shop" },
  { id: "VAN-09", vin: "417VN2087", type: "Van", capacityKg: 780, km: 24400, cost: 640000, status: "Retired" },
];

const seedDrivers: Driver[] = [
  { id: "D001", name: "Alex Morgan", license: "DL-99383", category: "LMV", expiry: "12/2027", contact: "+91 9982XXXXX", tripsCompleted: 46, safetyScore: 92, status: "Available" },
  { id: "D002", name: "Zora Chen", license: "DL-44920", category: "LMV", expiry: "05/2025 EXPIRED", contact: "+91 9982XXXXX", tripsCompleted: 87, safetyScore: 78, status: "Suspended" },
  { id: "D003", name: "Priya Rao", license: "DL-37021", category: "LMV", expiry: "09/2027", contact: "+91 9440XXXXX", tripsCompleted: 63, safetyScore: 88, status: "On Trip" },
  { id: "D004", name: "Guruja Singh", license: "SL-90045", category: "HMV", expiry: "03/2027", contact: "+91 9945XXXXX", tripsCompleted: 55, safetyScore: 81, status: "Off Duty" },
];

const seedTrips: Trip[] = [
  { id: "TR001", vehicleId: "VAN-05", driverId: "D001", origin: "Bommanagar Depot", destination: "Anandanand Hub", cargoKg: 100, distanceKm: 45, eta: "45 min", status: "Dispatched" },
  { id: "TR002", vehicleId: "TRUCK-8", driverId: "D003", origin: "Hosur Industrial Area", destination: "General Warehouse", cargoKg: 4200, distanceKm: 210, eta: "3h 20m", status: "Dispatched" },
  { id: "TR003", vehicleId: "MINI-03", driverId: "D004", origin: "Depot", destination: "Retail", cargoKg: 600, distanceKm: 30, eta: "In 2h", status: "Draft" },
];

const seedServices: ServiceRecord[] = [
  { id: "S1", vehicleId: "VAN-05", service: "Oil Change", date: "05/07/2026", cost: 2600, status: "In Shop" },
  { id: "S2", vehicleId: "TRUCK-8", service: "Engine Repair", date: "06/07/2026", cost: 18200, status: "Completed" },
  { id: "S3", vehicleId: "MINI-03", service: "Tyre Replace", date: "07/07/2026", cost: 6200, status: "In Shop" },
];

const seedFuel: FuelLog[] = [
  { id: "F1", vehicleId: "VAN-05", date: "05/07/2026", liters: 40, cost: 3550 },
  { id: "F2", vehicleId: "TRUCK-8", date: "06/07/2026", liters: 90, cost: 8400 },
  { id: "F3", vehicleId: "MINI-03", date: "06/07/2026", liters: 25, cost: 2050 },
];

const seedExpenses: Expense[] = [
  { id: "E1", tripId: "TR001", vehicleId: "VAN-05", toll: 120, other: 0, total: 120, status: "Approved" },
  { id: "E2", tripId: "TR002", vehicleId: "TRUCK-8", toll: 340, other: 60, total: 10400, status: "Pending" },
];

export const useStore = create<Store>()((set) => ({
  role: null,
  vehicles: seedVehicles,
  drivers: seedDrivers,
  trips: seedTrips,
  services: seedServices,
  fuelLogs: seedFuel,
  expenses: seedExpenses,
  setRole: (r) => {
    set({ role: r });
    if (typeof window !== "undefined") {
      if (r) localStorage.setItem("transitops:role", r);
      else localStorage.removeItem("transitops:role");
    }
  },
  addVehicle: (v) => set((s) => ({ vehicles: [...s.vehicles, v] })),
  updateVehicle: (id, patch) =>
    set((s) => ({ vehicles: s.vehicles.map((v) => (v.id === id ? { ...v, ...patch } : v)) })),
  addDriver: (d) => set((s) => ({ drivers: [...s.drivers, d] })),
  addTrip: (t) => set((s) => ({ trips: [...s.trips, t] })),
  updateTrip: (id, patch) =>
    set((s) => ({ trips: s.trips.map((t) => (t.id === id ? { ...t, ...patch } : t)) })),
  addService: (s0) => set((s) => ({ services: [...s.services, s0] })),
  addFuelLog: (f) => set((s) => ({ fuelLogs: [...s.fuelLogs, f] })),
  addExpense: (e) => set((s) => ({ expenses: [...s.expenses, e] })),
}));

export const ROLE_ACCESS: Record<Role, string[]> = {
  "Fleet Manager": ["dashboard", "fleet", "drivers", "trips", "maintenance", "fuel", "analytics", "settings"],
  Dispatcher: ["dashboard", "trips", "drivers", "fleet"],
  "Safety Officer": ["dashboard", "drivers", "maintenance"],
  "Financial Analyst": ["dashboard", "fuel", "analytics"],
};