import { useState } from 'react';
import { Search, Plus, Truck, X, Fuel, Wrench, MapPin, Calendar, User } from 'lucide-react';
import { Card, PageHeader, StatusBadge, Button } from '../components/ui';
import { vehicles } from '../data/mockData';
import { Vehicle } from '../types';

export default function FleetPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('All');
  const [selected, setSelected] = useState<Vehicle | null>(null);

  const filtered = vehicles.filter(v => {
    const match = v.plate.toLowerCase().includes(search.toLowerCase()) || 
                  v.model.toLowerCase().includes(search.toLowerCase());
    return match && (filter === 'All' || v.status === filter);
  });

  return (
    <div>
      <PageHeader 
        title="Fleet Management" 
        subtitle="Manage and monitor your vehicle registry"
        action={<Button><Plus className="w-4 h-4" />Add Vehicle</Button>}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by plate or model..."
            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition"
          />
        </div>
        <div className="flex gap-2">
          {['All', 'Available', 'In Trip', 'Maintenance'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
                filter === f 
                  ? 'bg-amber-500 text-gray-900' 
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(v => (
          <Card 
            key={v.id} 
            className="p-5 hover:border-amber-500/30 transition cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4" onClick={() => setSelected(v)}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gray-800 flex items-center justify-center group-hover:bg-amber-500/10 transition">
                  <Truck className="w-5 h-5 text-gray-400 group-hover:text-amber-400 transition" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{v.model}</p>
                  <p className="text-gray-500 text-xs">{v.plate}</p>
                </div>
              </div>
              <StatusBadge status={v.status} />
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs" onClick={() => setSelected(v)}>
              <div>
                <p className="text-gray-500">Type</p>
                <p className="text-gray-200 mt-0.5">{v.type} · {v.year}</p>
              </div>
              <div>
                <p className="text-gray-500">Capacity</p>
                <p className="text-gray-200 mt-0.5">{v.capacity} kg</p>
              </div>
              <div>
                <p className="text-gray-500">Mileage</p>
                <p className="text-gray-200 mt-0.5">{v.mileage.toLocaleString()} km</p>
              </div>
              <div>
                <p className="text-gray-500">Fuel Level</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex-1 h-1.5 rounded-full bg-gray-700 overflow-hidden">
                    <div className={`h-full rounded-full ${v.fuelLevel < 30 ? 'bg-red-500' : v.fuelLevel < 60 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${v.fuelLevel}%` }}></div>
                  </div>
                  <span className="text-gray-300">{v.fuelLevel}%</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Vehicle detail drawer */}
      {selected && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setSelected(null)} />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#1f2937] border-l border-gray-700 z-50 slide-in overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-700">
              <h3 className="text-white font-semibold">Vehicle Details</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                  <Truck className="w-8 h-8 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-white text-xl font-bold">{selected.model}</h2>
                  <p className="text-gray-500 text-sm">{selected.plate}</p>
                  <div className="mt-1.5"><StatusBadge status={selected.status} /></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { icon: Truck, label: 'Type', value: `${selected.type} · ${selected.year}` },
                  { icon: User, label: 'Assigned Driver', value: selected.driver || 'Unassigned' },
                  { icon: MapPin, label: 'Mileage', value: `${selected.mileage.toLocaleString()} km` },
                  { icon: Calendar, label: 'Last Service', value: selected.lastService },
                ].map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <div key={i} className="p-3 rounded-xl bg-gray-800/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-gray-500 text-xs">{d.label}</span>
                      </div>
                      <p className="text-white text-sm font-medium">{d.value}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-xs flex items-center gap-2"><Fuel className="w-3.5 h-3.5" />Fuel Level</span>
                  <span className="text-white text-sm font-medium">{selected.fuelLevel}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-700 overflow-hidden">
                  <div className={`h-full rounded-full ${selected.fuelLevel < 30 ? 'bg-red-500' : selected.fuelLevel < 60 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${selected.fuelLevel}%` }}></div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-xs flex items-center gap-2"><Wrench className="w-3.5 h-3.5" />Capacity</span>
                  <span className="text-white text-sm font-medium">{selected.capacity} kg</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1">Edit Vehicle</Button>
                <Button variant="secondary" className="flex-1">Service History</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
