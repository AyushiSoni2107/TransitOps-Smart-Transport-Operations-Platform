import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useStore } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/analytics")({ component: AnalyticsPage });

function Stat({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <Card className="p-4">
      <div className="text-xs text-muted-foreground uppercase">{label}</div>
      <div className={`mt-2 text-2xl font-semibold ${tone ?? ""}`}>{value}</div>
    </Card>
  );
}

function AnalyticsPage() {
  const { vehicles, trips, fuelLogs, services, expenses } = useStore();
  const totalKm = trips.reduce((s, t) => s + t.distanceKm, 0);
  const totalLiters = fuelLogs.reduce((s, l) => s + l.liters, 0);
  const kmPerL = totalLiters ? (totalKm / totalLiters).toFixed(1) : "—";
  const util = Math.round((vehicles.filter((v) => v.status === "On Trip").length / Math.max(1, vehicles.length)) * 100);
  const opCost = fuelLogs.reduce((s, r) => s + r.cost, 0) + services.reduce((s, r) => s + r.cost, 0) + expenses.reduce((s, r) => s + r.total, 0);

  const monthly = [
    { m: "Jan", v: 18000 }, { m: "Feb", v: 21000 }, { m: "Mar", v: 24500 },
    { m: "Apr", v: 27000 }, { m: "May", v: 30000 }, { m: "Jun", v: 34000 },
  ];

  const conflict = vehicles.slice(0, 3).map((v) => ({
    id: v.id,
    cost: fuelLogs.filter((f) => f.vehicleId === v.id).reduce((s, r) => s + r.cost, 0)
      + services.filter((r) => r.vehicleId === v.id).reduce((s, r) => s + r.cost, 0),
  }));
  const maxCost = Math.max(1, ...conflict.map((c) => c.cost));

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold mb-6">Reports & Analytics</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Stat label="Fuel Efficiency" value={`${kmPerL} km/L`} />
        <Stat label="Fleet Utilization" value={`${util}%`} tone="text-primary" />
        <Stat label="Operational Cost" value={`₹${opCost.toLocaleString()}`} />
        <Stat label="Vehicle ROI" value="14.2%" tone="text-emerald-400" />
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
        <Card className="p-5">
          <div className="font-medium mb-4">Monthly Revenue</div>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 25%)" />
                <XAxis dataKey="m" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ background: "#111", border: "1px solid #333" }} />
                <Bar dataKey="v" fill="oklch(0.769 0.166 65)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <div className="font-medium mb-4">Top Cost Vehicles</div>
          {conflict.map((c) => (
            <div key={c.id} className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-mono">{c.id}</span>
                <span className="text-muted-foreground">₹{c.cost.toLocaleString()}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-rose-500" style={{ width: `${(c.cost / maxCost) * 100}%` }} />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </AppShell>
  );
}