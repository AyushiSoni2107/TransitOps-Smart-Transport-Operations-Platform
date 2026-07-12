import { Truck, Users, Route, Wrench, Fuel, TrendingUp, ArrowUpRight, ArrowDownRight, Activity, AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { GlassCard, Card, PageHeader, StatusBadge, Button } from '../components/ui';
import { DonutChart, BarChart, AreaChart, ProgressBar } from '../components/Charts';
import AIOpsPanel from '../components/AIOpsPanel';
import { trips, alerts } from '../data/mockData';

const kpis = [
  { label: 'Active Vehicles', value: '24', total: '28', change: '+2', trend: 'up', icon: Truck, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: 'Active Drivers', value: '18', total: '22', change: '+1', trend: 'up', icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { label: 'Ongoing Trips', value: '12', total: '—', change: '+3', trend: 'up', icon: Route, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { label: 'In Maintenance', value: '4', total: '28', change: '-1', trend: 'down', icon: Wrench, color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { label: 'Fuel Efficiency', value: '7.2', unit: 'km/L', change: '+0.4', trend: 'up', icon: Fuel, color: 'text-teal-400', bg: 'bg-teal-500/10' },
  { label: 'Fleet Utilization', value: '86', unit: '%', change: '+5%', trend: 'up', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10' },
];

const vehicleStatusData = [
  { label: 'Available', value: 18, color: '#10b981' },
  { label: 'In Trip', value: 6, color: '#3b82f6' },
  { label: 'Maintenance', value: 4, color: '#f59e0b' },
];

const alertIcons = {
  error: { icon: XCircle, color: 'text-red-400' },
  warning: { icon: AlertTriangle, color: 'text-amber-400' },
  info: { icon: Info, color: 'text-blue-400' },
  success: { icon: CheckCircle2, color: 'text-emerald-400' },
};

export default function DashboardPage() {
  return (
    <div>
      <PageHeader 
        title="Dashboard" 
        subtitle="Real-time overview of your fleet operations · July 12, 2024"
        action={<Button><Activity className="w-4 h-4" />Live View</Button>}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <GlassCard key={i} className="p-4 hover:border-amber-500/20 transition group">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                  <Icon className={`w-[18px] h-[18px] ${kpi.color}`} />
                </div>
                <span className={`flex items-center text-xs font-medium ${
                  kpi.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {kpi.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
              <p className="text-white text-2xl font-bold">
                {kpi.value}
                {kpi.unit && <span className="text-sm text-gray-500 font-normal ml-1">{kpi.unit}</span>}
              </p>
              <p className="text-gray-500 text-xs mt-1">{kpi.label}</p>
            </GlassCard>
          );
        })}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Vehicle Status Chart */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-white font-semibold text-sm">Vehicle Status</h3>
              <p className="text-gray-500 text-xs mt-0.5">Current fleet distribution</p>
            </div>
            <span className="text-gray-500 text-xs">28 total</span>
          </div>
          <DonutChart data={vehicleStatusData} />
        </Card>

        {/* Monthly Trip Stats */}
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-white font-semibold text-sm">Monthly Trip Statistics</h3>
              <p className="text-gray-500 text-xs mt-0.5">Trips vs completed trips</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-400"></span><span className="text-gray-400">Total</span></span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-gray-600"></span><span className="text-gray-400">Completed</span></span>
            </div>
          </div>
          <BarChart data={[
            { label: 'Jan', value: 312, secondary: 298 },
            { label: 'Feb', value: 287, secondary: 271 },
            { label: 'Mar', value: 345, secondary: 330 },
            { label: 'Apr', value: 398, secondary: 378 },
            { label: 'May', value: 421, secondary: 408 },
            { label: 'Jun', value: 389, secondary: 374 },
            { label: 'Jul', value: 203, secondary: 196 },
          ]} />
        </Card>
      </div>

      {/* Fuel + Maintenance + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-white font-semibold text-sm">Fuel Consumption Trend</h3>
              <p className="text-gray-500 text-xs mt-0.5">Last 7 months · liters</p>
            </div>
          </div>
          <AreaChart data={[
            { label: 'Jan', value: 4200 },
            { label: 'Feb', value: 3980 },
            { label: 'Mar', value: 4510 },
            { label: 'Apr', value: 4750 },
            { label: 'May', value: 4320 },
            { label: 'Jun', value: 4100 },
            { label: 'Jul', value: 2200 },
          ]} />
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-white font-semibold text-sm">Maintenance Overview</h3>
              <p className="text-gray-500 text-xs mt-0.5">Service status by priority</p>
            </div>
          </div>
          <div className="space-y-4">
            <ProgressBar value={85} label="Routine Service" color="emerald" />
            <ProgressBar value={62} label="Preventive" color="amber" />
            <ProgressBar value={28} label="Urgent Repairs" color="red" />
            <ProgressBar value={45} label="Inspections Due" color="blue" />
          </div>
          <div className="mt-5 pt-4 border-t border-gray-700/50 grid grid-cols-3 gap-3 text-center">
            <div><p className="text-white text-lg font-bold">7</p><p className="text-gray-500 text-[10px]">Scheduled</p></div>
            <div><p className="text-white text-lg font-bold">3</p><p className="text-gray-500 text-[10px]">In Progress</p></div>
            <div><p className="text-white text-lg font-bold">2</p><p className="text-gray-500 text-[10px]">Overdue</p></div>
          </div>
        </Card>

        {/* Recent Alerts */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-sm">Recent Alerts</h3>
            <button className="text-amber-400 text-xs hover:underline">View all</button>
          </div>
          <div className="space-y-2.5">
            {alerts.slice(0, 5).map((a) => {
              const { icon: Icon, color } = alertIcons[a.type];
              return (
                <div key={a.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-800/50 transition">
                  <Icon className={`w-4 h-4 ${color} mt-0.5 shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-200 text-xs leading-snug">{a.message}</p>
                    <p className="text-gray-500 text-[10px] mt-0.5">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Recent Trips + AI Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 lg:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-sm">Recent Trip Activity</h3>
            <Button variant="secondary" size="sm">View All Trips</Button>
          </div>
          <div className="overflow-x-auto -mx-5 px-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 text-xs border-b border-gray-700/50">
                  <th className="pb-3 pr-4 font-medium">Trip ID</th>
                  <th className="pb-3 pr-4 font-medium">Route</th>
                  <th className="pb-3 pr-4 font-medium">Driver</th>
                  <th className="pb-3 pr-4 font-medium">Distance</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {trips.slice(0, 6).map((t) => (
                  <tr key={t.id} className="border-b border-gray-800/50 last:border-0 hover:bg-gray-800/30 transition">
                    <td className="py-3 pr-4 text-amber-400 font-medium text-xs">{t.id}</td>
                    <td className="py-3 pr-4 text-gray-300 text-xs">
                      <span className="block">{t.origin}</span>
                      <span className="text-gray-500">→ {t.destination}</span>
                    </td>
                    <td className="py-3 pr-4 text-gray-300 text-xs">{t.driver}</td>
                    <td className="py-3 pr-4 text-gray-400 text-xs">{t.distance}</td>
                    <td className="py-3 pr-4"><StatusBadge status={t.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <AIOpsPanel />
      </div>
    </div>
  );
}
