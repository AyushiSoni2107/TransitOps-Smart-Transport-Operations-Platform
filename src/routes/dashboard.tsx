import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { useStore } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

function Stat({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <Card className="p-4">
      <div className="text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
      <div className={`mt-2 text-3xl font-semibold ${tone ?? "text-foreground"}`}>{value}</div>
    </Card>
  );
}

function Dashboard() {
  const { vehicles, trips, drivers } = useStore();
  const available = vehicles.filter((v) => v.status === "Available").length;
  const onTrip = vehicles.filter((v) => v.status === "On Trip").length;
  const inShop = vehicles.filter((v) => v.status === "In Shop").length;
  const retired = vehicles.filter((v) => v.status === "Retired").length;
  const util = Math.round((onTrip / Math.max(1, vehicles.length)) * 100);
  const driversOnDuty = drivers.filter((d) => d.status !== "Off Duty" && d.status !== "Suspended").length;

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
      <p className="text-sm text-muted-foreground mb-6">Live operations overview</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <Stat label="Active Vehicles" value={String(vehicles.length)} />
        <Stat label="Available" value={String(available)} tone="text-emerald-400" />
        <Stat label="Vehicles in Maintenance" value={String(inShop)} tone="text-amber-400" />
        <Stat label="Active Trips" value={String(trips.filter((t) => t.status === "Dispatched").length)} tone="text-sky-400" />
        <Stat label="Drivers on Duty" value={String(driversOnDuty)} />
        <Stat label="Fleet Utilization" value={`${util}%`} tone="text-primary" />
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
        <Card className="p-5">
          <div className="font-medium mb-3">Recent Trips</div>
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground uppercase">
              <tr className="text-left border-b border-border/60">
                <th className="py-2">Trip</th>
                <th>Vehicle</th>
                <th>Driver</th>
                <th>Status</th>
                <th>ETA</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((t) => {
                const drv = drivers.find((d) => d.id === t.driverId);
                return (
                  <tr key={t.id} className="border-b border-border/30">
                    <td className="py-2 font-mono text-xs">{t.id}</td>
                    <td>{t.vehicleId}</td>
                    <td>{drv?.name ?? "—"}</td>
                    <td><StatusBadge status={t.status} /></td>
                    <td className="text-muted-foreground">{t.eta}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
        <Card className="p-5">
          <div className="font-medium mb-4">Vehicle Status</div>
          {[
            { label: "Available", n: available, cls: "bg-emerald-500" },
            { label: "On Trip", n: onTrip, cls: "bg-sky-500" },
            { label: "In Shop", n: inShop, cls: "bg-amber-500" },
            { label: "Retired", n: retired, cls: "bg-rose-500" },
          ].map((r) => (
            <div key={r.label} className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span>{r.label}</span>
                <span className="text-muted-foreground">{r.n}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full ${r.cls}`}
                  style={{ width: `${(r.n / Math.max(1, vehicles.length)) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </AppShell>
  );
}