import { Wrench, Plus, AlertTriangle, Calendar, CheckCircle2, Clock, Truck } from 'lucide-react';
import { Card, PageHeader, StatusBadge, Button } from '../components/ui';

const upcomingServices = [
  { id: 'S001', vehicle: 'BUS-12', service: 'Brake Pad Replacement', priority: 'High', date: '2024-07-15', mechanic: 'Shop A' },
  { id: 'S002', vehicle: 'TRUCK-3', service: 'Oil Change & Filter', priority: 'Medium', date: '2024-07-18', mechanic: 'Shop B' },
  { id: 'S003', vehicle: 'VAN-06', service: 'Tire Rotation', priority: 'Low', date: '2024-07-22', mechanic: 'Shop A' },
  { id: 'S004', vehicle: 'MICRO-05', service: 'Full Inspection', priority: 'High', date: '2024-07-14', mechanic: 'Shop C' },
];

const maintenanceHistory = [
  { id: 'M001', vehicle: 'TRUCK-8', service: 'Engine Tune-up', date: '2024-06-01', cost: '$1,240', status: 'Completed' },
  { id: 'M002', vehicle: 'BUS-12', service: 'Transmission Service', date: '2024-05-20', cost: '$3,450', status: 'Completed' },
  { id: 'M003', vehicle: 'TRUCK-3', service: 'Brake Inspection', date: '2024-05-15', cost: '$420', status: 'Completed' },
  { id: 'M004', vehicle: 'MICRO-05', service: 'Battery Replacement', date: '2024-04-30', cost: '$280', status: 'Completed' },
];

const progressSteps = [
  { step: 'Service Requested', done: true },
  { step: 'Approved', done: true },
  { step: 'In Progress', done: true },
  { step: 'Quality Check', done: false },
  { step: 'Completed', done: false },
];

export default function MaintenancePage() {
  return (
    <div>
      <PageHeader 
        title="Maintenance" 
        subtitle="Schedule, track, and manage vehicle maintenance"
        action={<Button><Plus className="w-4 h-4" />Service Request</Button>}
      />

      {/* Priority Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 border-red-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-white text-2xl font-bold">2</p>
              <p className="text-gray-500 text-xs">Urgent Repairs</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-white text-2xl font-bold">7</p>
              <p className="text-gray-500 text-xs">Scheduled Services</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-emerald-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-white text-2xl font-bold">28</p>
              <p className="text-gray-500 text-xs">Completed This Month</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Upcoming Schedule */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-sm">Upcoming Service Schedule</h3>
            <Calendar className="w-4 h-4 text-gray-500" />
          </div>
          <div className="space-y-3">
            {upcomingServices.map(s => (
              <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition">
                <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">{s.vehicle}</p>
                  <p className="text-gray-500 text-xs">{s.service}</p>
                </div>
                <div className="text-right">
                  <StatusBadge status={s.priority} />
                  <p className="text-gray-500 text-xs mt-1">{s.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Service Request Form */}
        <Card className="p-5">
          <h3 className="text-white font-semibold text-sm mb-4">New Service Request</h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block">Vehicle</label>
              <select className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50">
                <option>Select vehicle...</option>
                <option>BUS-12</option><option>TRUCK-3</option><option>VAN-06</option><option>MICRO-05</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block">Service Type</label>
              <select className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50">
                <option>Select service...</option>
                <option>Routine Maintenance</option><option>Repair</option><option>Inspection</option><option>Tire Service</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Priority</label>
                <select className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50">
                  <option>Low</option><option>Medium</option><option>High</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Preferred Date</label>
                <input type="date" className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50" />
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block">Notes</label>
              <textarea 
                rows={2}
                placeholder="Additional details..."
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 resize-none"
              />
            </div>
            <Button className="w-full"><Wrench className="w-4 h-4" />Submit Request</Button>
          </div>
        </Card>
      </div>

      {/* Progress Timeline */}
      <Card className="p-5 mb-6">
        <h3 className="text-white font-semibold text-sm mb-5">Service Progress · BUS-12 · Brake Pad Replacement</h3>
        <div className="flex items-center justify-between max-w-3xl">
          {progressSteps.map((s, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  s.done ? 'bg-emerald-500 text-gray-900' : 'bg-gray-700 text-gray-500'
                }`}>
                  {s.done ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-bold">{i + 1}</span>}
                </div>
                <p className={`text-xs mt-2 text-center ${s.done ? 'text-white' : 'text-gray-500'}`}>{s.step}</p>
              </div>
              {i < progressSteps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${s.done ? 'bg-emerald-500/50' : 'bg-gray-700'}`}></div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Maintenance History */}
      <Card className="p-5">
        <h3 className="text-white font-semibold text-sm mb-4">Maintenance History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 text-xs border-b border-gray-700/50">
                <th className="pb-3 pr-4 font-medium">Service ID</th>
                <th className="pb-3 pr-4 font-medium">Vehicle</th>
                <th className="pb-3 pr-4 font-medium">Service</th>
                <th className="pb-3 pr-4 font-medium">Date</th>
                <th className="pb-3 pr-4 font-medium">Cost</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceHistory.map(m => (
                <tr key={m.id} className="border-b border-gray-800/50 last:border-0 hover:bg-gray-800/30 transition">
                  <td className="py-3 pr-4 text-amber-400 font-medium text-xs">{m.id}</td>
                  <td className="py-3 pr-4 text-gray-300 text-xs">{m.vehicle}</td>
                  <td className="py-3 pr-4 text-gray-300 text-xs">{m.service}</td>
                  <td className="py-3 pr-4 text-gray-400 text-xs">{m.date}</td>
                  <td className="py-3 pr-4 text-gray-200 text-xs font-medium">{m.cost}</td>
                  <td className="py-3 pr-4"><StatusBadge status={m.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
