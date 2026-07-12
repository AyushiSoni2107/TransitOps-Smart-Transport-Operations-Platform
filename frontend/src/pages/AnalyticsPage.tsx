import { Download, TrendingUp, TrendingDown, Truck, Fuel, Wrench, Users, DollarSign } from 'lucide-react';
import { Card, PageHeader, Button, GlassCard } from '../components/ui';
import { BarChart, AreaChart, ProgressBar } from '../components/Charts';

const metrics = [
  { label: 'Fleet Utilization', value: '86%', change: '+5%', trend: 'up', icon: Truck, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: 'Avg Fuel Efficiency', value: '7.2 km/L', change: '+0.4', trend: 'up', icon: Fuel, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { label: 'Maintenance Cost', value: '$12,160', change: '-8%', trend: 'down', icon: Wrench, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { label: 'Driver Performance', value: '92.4', change: '+2.1', trend: 'up', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10' },
];

const driverPerf = [
  { name: 'Lena Müller', score: 99, trips: 730 },
  { name: 'Alex Carter', score: 98, trips: 342 },
  { name: 'Priya Patel', score: 96, trips: 415 },
  { name: 'Maria Chen', score: 94, trips: 519 },
  { name: 'James Okonkwo', score: 87, trips: 201 },
  { name: 'Sam Rivera', score: 61, trips: 89 },
];

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader 
        title="Analytics" 
        subtitle="Comprehensive fleet performance insights"
        action={<Button><Download className="w-4 h-4" />Download Report</Button>}
      />

      {/* Top metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <GlassCard key={i} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg ${m.bg} flex items-center justify-center`}>
                  <Icon className={`w-[18px] h-[18px] ${m.color}`} />
                </div>
                <span className={`flex items-center text-xs font-medium ${m.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {m.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {m.change}
                </span>
              </div>
              <p className="text-white text-xl font-bold">{m.value}</p>
              <p className="text-gray-500 text-xs mt-1">{m.label}</p>
            </GlassCard>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Fleet Utilization */}
        <Card className="p-5">
          <h3 className="text-white font-semibold text-sm mb-5">Fleet Utilization by Vehicle</h3>
          <div className="space-y-4">
            {[
              { name: 'TRUCK-8', value: 94 },
              { name: 'BUS-12', value: 88 },
              { name: 'TRUCK-3', value: 76 },
              { name: 'VAN-06', value: 82 },
              { name: 'MICRO-05', value: 45 },
            ].map((v, i) => (
              <ProgressBar key={i} value={v.value} label={v.name} color="amber" />
            ))}
          </div>
        </Card>

        {/* Fuel Efficiency Graph */}
        <Card className="p-5">
          <h3 className="text-white font-semibold text-sm mb-5">Fuel Efficiency Trend</h3>
          <AreaChart data={[
            { label: 'Jan', value: 6.8 },
            { label: 'Feb', value: 6.9 },
            { label: 'Mar', value: 7.0 },
            { label: 'Apr', value: 6.7 },
            { label: 'May', value: 7.1 },
            { label: 'Jun', value: 7.2 },
            { label: 'Jul', value: 7.2 },
          ]} />
        </Card>

        {/* Maintenance Trends */}
        <Card className="p-5">
          <h3 className="text-white font-semibold text-sm mb-5">Maintenance Trends</h3>
          <BarChart data={[
            { label: 'Jan', value: 12 },
            { label: 'Feb', value: 8 },
            { label: 'Mar', value: 15 },
            { label: 'Apr', value: 10 },
            { label: 'May', value: 18 },
            { label: 'Jun', value: 14 },
            { label: 'Jul', value: 7 },
          ]} height={180} />
        </Card>

        {/* Cost Analysis */}
        <Card className="p-5">
          <h3 className="text-white font-semibold text-sm mb-5">Cost Analysis</h3>
          <div className="space-y-4">
            {[
              { label: 'Fuel Costs', value: '$18,240', pct: 42, color: 'amber' },
              { label: 'Maintenance', value: '$12,160', pct: 28, color: 'blue' },
              { label: 'Driver Salaries', value: '$7,820', pct: 18, color: 'emerald' },
              { label: 'Insurance', value: '$3,480', pct: 8, color: 'red' },
              { label: 'Other', value: '$1,740', pct: 4, color: 'amber' },
            ].map((c, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <span className="text-gray-300 text-xs">{c.label}</span>
                    <span className="text-white text-sm font-medium ml-2">{c.value}</span>
                  </div>
                  <span className="text-gray-500 text-xs">{c.pct}%</span>
                </div>
                <ProgressBar value={c.pct} color={c.color} />
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-gray-700/50 flex items-center justify-between">
            <span className="text-gray-400 text-xs flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" />Total Operating Cost</span>
            <span className="text-white text-xl font-bold">$43,440</span>
          </div>
        </Card>
      </div>

      {/* Driver Performance Analytics */}
      <Card className="p-5">
        <h3 className="text-white font-semibold text-sm mb-5">Driver Performance Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {driverPerf.map((d, i) => (
            <div key={i} className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white text-sm font-medium">{d.name}</p>
                <span className={`text-lg font-bold ${
                  d.score >= 90 ? 'text-emerald-400' : d.score >= 75 ? 'text-amber-400' : 'text-red-400'
                }`}>{d.score}</span>
              </div>
              <ProgressBar value={d.score} color={d.score >= 90 ? 'emerald' : d.score >= 75 ? 'amber' : 'red'} />
              <p className="text-gray-500 text-xs mt-2">{d.trips} total trips completed</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
