import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { useStore, type ServiceRecord } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/maintenance")({ component: MaintenancePage });

function MaintenancePage() {
  const { vehicles, services, addService, updateVehicle } = useStore();
  const [form, setForm] = useState<Partial<ServiceRecord>>({});

  const save = () => {
    if (!form.vehicleId || !form.service) return toast.error("Vehicle and service required");
    addService({
      id: `S${services.length + 1}`,
      vehicleId: form.vehicleId!,
      service: form.service!,
      date: form.date ?? new Date().toLocaleDateString(),
      cost: Number(form.cost ?? 0),
      status: "In Shop",
    });
    updateVehicle(form.vehicleId!, { status: "In Shop" });
    toast.success(`${form.vehicleId} moved to In Shop`);
    setForm({});
  };

  const toggle = (v: string, to: "Available" | "In Shop") => {
    updateVehicle(v, { status: to });
    toast.success(`${v} is now ${to}`);
  };

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold mb-6">Maintenance</h1>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="font-medium mb-4">Log Service Record</div>
          <div className="grid gap-3">
            <div>
              <Label>Vehicle</Label>
              <Select value={form.vehicleId} onValueChange={(v) => setForm({ ...form, vehicleId: v })}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {vehicles.filter((v) => v.status !== "Retired").map((v) => (
                    <SelectItem key={v.id} value={v.id}>{v.id}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div><Label>Service Type</Label><Input value={form.service ?? ""} onChange={(e) => setForm({ ...form, service: e.target.value })} placeholder="Oil Change" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Date</Label><Input value={form.date ?? ""} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="DD/MM/YYYY" /></div>
              <div><Label>Cost</Label><Input type="number" value={form.cost ?? ""} onChange={(e) => setForm({ ...form, cost: Number(e.target.value) })} /></div>
            </div>
            <Button onClick={save}>Save</Button>
          </div>

          <div className="mt-6 border-t border-border/60 pt-4 space-y-2">
            <div className="text-xs text-muted-foreground uppercase">Transition</div>
            {vehicles.filter((v) => v.status === "Available" || v.status === "In Shop").map((v) => (
              <div key={v.id} className="flex items-center justify-between text-sm">
                <span className="font-mono">{v.id}</span>
                <div className="flex gap-2">
                  <StatusBadge status={v.status} />
                  <Button size="sm" variant="outline" onClick={() => toggle(v.id, v.status === "Available" ? "In Shop" : "Available")}>
                    → {v.status === "Available" ? "In Shop" : "Available"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Note: In Shop vehicles are excluded from the Trip Dispatcher pool.
          </p>
        </Card>

        <Card className="p-0 overflow-hidden">
          <div className="p-4 border-b border-border/60 font-medium">Service Log</div>
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/40">
              <tr className="text-left">
                <th className="p-3">Vehicle</th>
                <th>Service</th>
                <th>Cost</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id} className="border-t border-border/40">
                  <td className="p-3 font-mono">{s.vehicleId}</td>
                  <td>{s.service}</td>
                  <td>₹{s.cost.toLocaleString()}</td>
                  <td><StatusBadge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </AppShell>
  );
}