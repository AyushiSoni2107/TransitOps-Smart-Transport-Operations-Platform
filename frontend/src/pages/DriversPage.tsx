import { Search, Phone, Award, TrendingUp, Calendar, Truck, Plus } from 'lucide-react';
import { useState } from 'react';
import { Card, PageHeader, StatusBadge, Button } from '../components/ui';
import { drivers } from '../data/mockData';

export default function DriversPage() {
  const [search, setSearch] = useState('');

  const filtered = drivers.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.license.toLowerCase().includes(search.toLowerCase())
  );

  const scoreColor = (score: number) => 
    score >= 90 ? 'text-emerald-400' : score >= 75 ? 'text-amber-400' : 'text-red-400';

  const daysToExpiry = (date: string) => {
    const diff = new Date(date).getTime() - Date.now();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div>
      <PageHeader 
        title="Driver Management" 
        subtitle="Manage driver profiles, performance, and compliance"
        action={<Button><Plus className="w-4 h-4" />Add Driver</Button>}
      />

      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search drivers..."
          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(d => {
          const days = daysToExpiry(d.licenseExpiry);
          const expiringSoon = days < 90;
          return (
            <Card key={d.id} className="p-5 hover:border-amber-500/30 transition group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-gray-900 font-bold text-sm shrink-0">
                  {d.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-semibold text-sm">{d.name}</p>
                    <StatusBadge status={d.status} />
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5">{d.license}</p>
                </div>
              </div>

              {/* Safety Score */}
              <div className="mb-4 p-3 rounded-xl bg-gray-800/50">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Award className="w-3.5 h-3.5" />Safety Score
                  </span>
                  <span className={`text-lg font-bold ${scoreColor(d.safetyScore)}`}>{d.safetyScore}</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-700 overflow-hidden">
                  <div className={`h-full rounded-full ${
                    d.safetyScore >= 90 ? 'bg-emerald-500' : d.safetyScore >= 75 ? 'bg-amber-500' : 'bg-red-500'
                  }`} style={{ width: `${d.safetyScore}%` }}></div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-gray-500"><Truck className="w-3.5 h-3.5" />Assigned Vehicle</span>
                  <span className="text-gray-200">{d.assignedVehicle || 'Unassigned'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-gray-500"><Phone className="w-3.5 h-3.5" />Phone</span>
                  <span className="text-gray-200">{d.phone}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-gray-500"><Calendar className="w-3.5 h-3.5" />License Expiry</span>
                  <span className={expiringSoon ? 'text-amber-400 font-medium' : 'text-gray-200'}>
                    {d.licenseExpiry}
                    {expiringSoon && <span className="ml-1">({days}d)</span>}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-gray-500"><TrendingUp className="w-3.5 h-3.5" />Total Trips</span>
                  <span className="text-gray-200">{d.totalTrips}</span>
                </div>
              </div>

              {expiringSoon && (
                <div className="mt-3 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-amber-400 text-[11px] font-medium">
                    License expiring in {days} days — renewal required
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
