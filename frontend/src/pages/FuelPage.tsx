import { Download, Fuel, DollarSign, TrendingDown, Receipt } from 'lucide-react';
import { Card, PageHeader, Button } from '../components/ui';
import { AreaChart, BarChart } from '../components/Charts';

const fuelLogs = [
  { id: 'FL001', vehicle: 'TRUCK-3', date: '2024-07-12', liters: 120, cost: '$180', station: 'Shell A14' },
  { id: 'FL002', vehicle: 'BUS-12', date: '2024-07-11', liters: 200, cost: '$300', station: 'BP Station' },
  { id: 'FL003', vehicle: 'TRUCK-8', date: '2024-07-10', liters: 150, cost: '$225', station: 'Shell A14' },
  { id: 'FL004', vehicle: 'VAN-06', date: '2024-07-09', liters: 60, cost: '$90', station: 'Esso Hub' },
  { id: 'FL005', vehicle: 'MICRO-05', date: '2024-07-08', liters: 45, cost: '$67', station: 'Total M1' },
];

const expenseCategories = [
  { label: 'Fuel', value: 42, amount: '$18,240', color: 'bg-amber-500' },
  { label: 'Maintenance', value: 28, amount: '$12,160', color: 'bg-blue-500' },
  { label: 'Salaries', value: 18, amount: '$7,820', color: 'bg-emerald-500' },
  { label: 'Insurance', value: 8, amount: '$3,480', color: 'bg-purple-500' },
  { label: 'Other', value: 4, amount: '$1,740', color: 'bg-gray-500' },
];

export default function FuelPage() {
  return (
    <div>
      <PageHeader 
        title="Fuel & Expenses" 
        subtitle="Track fuel consumption and operating costs"
        action={<Button><Download className="w-4 h-4" />Export Report</Button>}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Fuel className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-white text-xl font-bold">$18,240</p>
              <p className="text-gray-500 text-xs">Total Fuel Cost</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white text-xl font-bold">$43,440</p>
              <p className="text-gray-500 text-xs">Total Operating Cost</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-white text-xl font-bold">7.2 km/L</p>
              <p className="text-gray-500 text-xs">Avg Efficiency</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Receipt className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-white text-xl font-bold">575</p>
              <p className="text-gray-500 text-xs">Fuel Logs (mo)</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Monthly Fuel Chart */}
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-white font-semibold text-sm">Monthly Fuel Consumption</h3>
              <p className="text-gray-500 text-xs mt-0.5">Liters consumed · last 7 months</p>
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

        {/* Expense Categories */}
        <Card className="p-5">
          <h3 className="text-white font-semibold text-sm mb-5">Expense Categories</h3>
          <div className="space-y-4">
            {expenseCategories.map((c, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-gray-300 text-xs">{c.label}</span>
                  <span className="text-white text-xs font-medium">{c.amount}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-700/50 overflow-hidden">
                  <div className={`h-full rounded-full ${c.color} bar-fill`} style={{ width: `${c.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-gray-700/50">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs">Total This Month</span>
              <span className="text-white text-lg font-bold">$43,440</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Fuel Logs Table */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-sm">Fuel Logs</h3>
          <Button variant="secondary" size="sm"><Download className="w-3.5 h-3.5" />Export CSV</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 text-xs border-b border-gray-700/50">
                <th className="pb-3 pr-4 font-medium">Log ID</th>
                <th className="pb-3 pr-4 font-medium">Vehicle</th>
                <th className="pb-3 pr-4 font-medium">Date</th>
                <th className="pb-3 pr-4 font-medium">Liters</th>
                <th className="pb-3 pr-4 font-medium">Cost</th>
                <th className="pb-3 pr-4 font-medium">Station</th>
              </tr>
            </thead>
            <tbody>
              {fuelLogs.map(l => (
                <tr key={l.id} className="border-b border-gray-800/50 last:border-0 hover:bg-gray-800/30 transition">
                  <td className="py-3 pr-4 text-amber-400 font-medium text-xs">{l.id}</td>
                  <td className="py-3 pr-4 text-gray-300 text-xs">{l.vehicle}</td>
                  <td className="py-3 pr-4 text-gray-400 text-xs">{l.date}</td>
                  <td className="py-3 pr-4 text-gray-200 text-xs">{l.liters} L</td>
                  <td className="py-3 pr-4 text-white text-xs font-medium">{l.cost}</td>
                  <td className="py-3 pr-4 text-gray-400 text-xs">{l.station}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
