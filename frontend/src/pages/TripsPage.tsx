import { useState } from 'react';
import { MapPin, Navigation, User, Truck, Clock, Route, Send, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { Card, PageHeader, Button } from '../components/ui';
import { drivers, vehicles } from '../data/mockData';

export default function TripsPage() {
  const [origin, setOrigin] = useState('Main Depot');
  const [dest, setDest] = useState('');
  const [driver, setDriver] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [dispatched, setDispatched] = useState(false);

  const timeline = [
    { step: 'Trip Created', status: 'done', time: '08:42' },
    { step: 'Driver Assigned', status: 'done', time: '08:45' },
    { step: 'Vehicle Allocated', status: 'done', time: '08:46' },
    { step: 'En Route to Pickup', status: 'active', time: '08:50' },
    { step: 'At Destination', status: 'pending', time: '—' },
    { step: 'Trip Completed', status: 'pending', time: '—' },
  ];

  return (
    <div>
      <PageHeader 
        title="Trip Dispatcher" 
        subtitle="Plan, assign, and track trips in real-time"
        action={<Button variant="secondary"><Route className="w-4 h-4" />Active Trips (12)</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dispatch Form */}
        <Card className="p-5 lg:col-span-1">
          <h3 className="text-white font-semibold text-sm mb-5">New Dispatch</h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block">Route Selection</label>
              <select className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50">
                <option>Express Route</option>
                <option>Standard Route</option>
                <option>Economy Route</option>
                <option>Custom Route</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />Pickup Location
              </label>
              <input
                value={origin}
                onChange={e => setOrigin(e.target.value)}
                placeholder="Enter pickup point"
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5" />Destination
              </label>
              <input
                value={dest}
                onChange={e => setDest(e.target.value)}
                placeholder="Enter destination"
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />Driver
                </label>
                <select
                  value={driver}
                  onChange={e => setDriver(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50"
                >
                  <option value="">Select...</option>
                  {drivers.filter(d => d.status === 'On Duty').map(d => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />Vehicle
                </label>
                <select
                  value={vehicle}
                  onChange={e => setVehicle(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50"
                >
                  <option value="">Select...</option>
                  {vehicles.filter(v => v.status === 'Available').map(v => (
                    <option key={v.id} value={v.model}>{v.model}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Estimate */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20">
              <p className="text-gray-400 text-xs mb-3">Estimated Trip</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-white text-xl font-bold">84 km</p>
                  <p className="text-gray-500 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />Distance</p>
                </div>
                <div>
                  <p className="text-white text-xl font-bold">2h 30m</p>
                  <p className="text-gray-500 text-xs flex items-center gap-1"><Clock className="w-3 h-3" />Duration</p>
                </div>
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={() => setDispatched(true)}
            >
              <Send className="w-4 h-4" />Dispatch Trip
            </Button>
            {dispatched && (
              <p className="text-emerald-400 text-xs text-center flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />Trip dispatched successfully!
              </p>
            )}
          </div>
        </Card>

        {/* Map placeholder + Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Map */}
          <Card className="p-0 overflow-hidden h-64">
            <div className="h-full relative bg-gradient-to-br from-gray-800 via-gray-800/50 to-gray-900 flex items-center justify-center">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}></div>
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-8 h-8 text-amber-400" />
                </div>
                <p className="text-gray-400 text-sm">Interactive Map</p>
                <p className="text-gray-600 text-xs mt-1">Route visualization will appear here</p>
              </div>
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                <span className="text-gray-300 text-xs">Pickup</span>
                <span className="text-gray-600 mx-2">━━━━</span>
                <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                <span className="text-gray-300 text-xs">Destination</span>
              </div>
            </div>
          </Card>

          {/* Live Timeline */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-semibold text-sm">Live Trip Timeline</h3>
              <span className="flex items-center gap-1.5 text-xs text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-dot"></span>
                TR006 · In Progress
              </span>
            </div>
            <div className="space-y-0">
              {timeline.map((t, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    {t.status === 'done' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                    {t.status === 'active' && <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />}
                    {t.status === 'pending' && <Circle className="w-5 h-5 text-gray-600" />}
                    {i < timeline.length - 1 && (
                      <div className={`w-0.5 h-10 ${t.status === 'done' ? 'bg-emerald-400/30' : 'bg-gray-700'}`}></div>
                    )}
                  </div>
                  <div className="pt-0.5 pb-8">
                    <p className={`text-sm font-medium ${
                      t.status === 'done' ? 'text-gray-300' : 
                      t.status === 'active' ? 'text-amber-400' : 'text-gray-600'
                    }`}>{t.step}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{t.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
