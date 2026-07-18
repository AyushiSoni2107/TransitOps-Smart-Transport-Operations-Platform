import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { useStore, type Vehicle } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/fleet")({ component: FleetPage });

function FleetPage() {
  const { vehicles, addVehicle, trips } = useStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<Vehicle>>({ type: "Van", status: "Available" });
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const shown = vehicles.filter(
    (v) =>
      (typeFilter === "all" || v.type === typeFilter) &&
      (statusFilter === "all" || v.status === statusFilter),
  );

  const submit = () => {
    if (!form.id || !form.vin || !form.capacityKg) {
      toast.error("Fill VIN, ID and capacity");
      return;
    }
    addVehicle({
      id: form.id!,
      vin: form.vin!,
      type: (form.type as Vehicle["type"]) ?? "Van",
      capacityKg: Number(form.capacityKg),
      km: Number(form.km ?? 0),
      cost: Number(form.cost ?? 0),
      status: (form.status as Vehicle["status"]) ?? "Available",
    });
    toast.success("Vehicle added");
    setOpen(false);
    setForm({ type: "Van", status: "Available" });
  };

  const canRetire = (v: Vehicle) =>
    v.status !== "On Trip" && !trips.some((t) => t.vehicleId === v.id && t.status === "Dispatched");

  return (
    <AppShell>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Vehicle Registry</h1>
          <p className="text-sm text-muted-foreground">Manage the operating fleet</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-1" /> Add Vehicle</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Register a vehicle</DialogTitle></DialogHeader>
            <div className="grid gap-3">
              <div><Label>Vehicle ID</Label><Input value={form.id ?? ""} onChange={(e) => setForm({ ...form, id: e.target.value })} placeholder="VAN-10" /></div>
              <div><Label>VIN</Label><Input value={form.vin ?? ""} onChange={(e) => setForm({ ...form, vin: e.target.value })} /></div>
              <div>
                <Label>Type</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as Vehicle["type"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Van">Van</SelectItem>
                    <SelectItem value="Truck">Truck</SelectItem>
                    <SelectItem value="Mini">Mini</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Capacity (kg)</Label><Input type="number" value={form.capacityKg ?? ""} onChange={(e) => setForm({ ...form, capacityKg: Number(e.target.value) })} /></div>
              <div><Label>Odometer (km)</Label><Input type="number" value={form.km ?? ""} onChange={(e) => setForm({ ...form, km: Number(e.target.value) })} /></div>
              <div><Label>Acquisition Cost</Label><Input type="number" value={form.cost ?? ""} onChange={(e) => setForm({ ...form, cost: Number(e.target.value) })} /></div>
            </div>
            <DialogFooter><Button onClick={submit}>Register</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4 mb-4 flex gap-3">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="Van">Van</SelectItem>
            <SelectItem value="Truck">Truck</SelectItem>
            <SelectItem value="Mini">Mini</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="On Trip">On Trip</SelectItem>
            <SelectItem value="In Shop">In Shop</SelectItem>
            <SelectItem value="Retired">Retired</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      <Card className="p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/40">
            <tr className="text-left">
              <th className="p-3">Vehicle ID</th>
              <th>VIN</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>KM</th>
              <th>Acq. Cost</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {shown.map((v) => (
              <tr key={v.id} className="border-t border-border/40">
                <td className="p-3 font-mono">{v.id}</td>
                <td>{v.vin}</td>
                <td>{v.type}</td>
                <td>{v.capacityKg} kg</td>
                <td>{v.km.toLocaleString()}</td>
                <td>₹{v.cost.toLocaleString()}</td>
                <td><StatusBadge status={v.status} /></td>
                <td className="pr-3 text-right">
                  {v.status !== "Retired" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={!canRetire(v)}
                      onClick={() => {
                        useStore.getState().updateVehicle(v.id, { status: "Retired" });
                        toast.success(`${v.id} retired`);
                      }}
                    >
                      Retire
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="text-xs text-muted-foreground mt-3">
        Rule: Registration must be unique. Retired / In Shop vehicles are hidden from Trip Dispatcher.
      </p>
    </AppShell>
  );
}