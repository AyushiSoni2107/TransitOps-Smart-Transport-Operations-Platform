import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { useStore } from "@/lib/mock-data";
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
import { Plus, Fuel as FuelIcon } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/fuel")({ component: FuelPage });

function FuelPage() {
  const { vehicles, fuelLogs, expenses, services, addFuelLog, addExpense } = useStore();
  const [openFuel, setOpenFuel] = useState(false);
  const [openExp, setOpenExp] = useState(false);
  const [f, setF] = useState<{ vehicleId?: string; liters?: number; cost?: number }>({});
  const [e, setE] = useState<{ tripId?: string; vehicleId?: string; toll?: number; other?: number }>({});

  const totalFuel = fuelLogs.reduce((s, r) => s + r.cost, 0);
  const totalMaint = services.reduce((s, r) => s + r.cost, 0);
  const totalExp = expenses.reduce((s, r) => s + r.total, 0);
  const grand = totalFuel + totalMaint + totalExp;

  return (
    <AppShell>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Fuel & Expense Management</h1>
        <div className="flex gap-2">
          <Dialog open={openFuel} onOpenChange={setOpenFuel}>
            <DialogTrigger asChild><Button><FuelIcon className="h-4 w-4 mr-1" /> Log Fuel</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Log Fuel</DialogTitle></DialogHeader>
              <div className="grid gap-3">
                <div>
                  <Label>Vehicle</Label>
                  <Select value={f.vehicleId} onValueChange={(v) => setF({ ...f, vehicleId: v })}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {vehicles.map((v) => (<SelectItem key={v.id} value={v.id}>{v.id}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Liters</Label><Input type="number" value={f.liters ?? ""} onChange={(ev) => setF({ ...f, liters: Number(ev.target.value) })} /></div>
                <div><Label>Cost</Label><Input type="number" value={f.cost ?? ""} onChange={(ev) => setF({ ...f, cost: Number(ev.target.value) })} /></div>
              </div>
              <DialogFooter>
                <Button onClick={() => {
                  if (!f.vehicleId || !f.liters) return toast.error("Fill fields");
                  addFuelLog({ id: `F${fuelLogs.length + 1}`, vehicleId: f.vehicleId, date: new Date().toLocaleDateString(), liters: f.liters, cost: f.cost ?? 0 });
                  toast.success("Fuel logged"); setOpenFuel(false); setF({});
                }}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={openExp} onOpenChange={setOpenExp}>
            <DialogTrigger asChild><Button variant="secondary"><Plus className="h-4 w-4 mr-1" /> Add Expense</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add Expense</DialogTitle></DialogHeader>
              <div className="grid gap-3">
                <div><Label>Trip ID</Label><Input value={e.tripId ?? ""} onChange={(ev) => setE({ ...e, tripId: ev.target.value })} /></div>
                <div>
                  <Label>Vehicle</Label>
                  <Select value={e.vehicleId} onValueChange={(v) => setE({ ...e, vehicleId: v })}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {vehicles.map((v) => (<SelectItem key={v.id} value={v.id}>{v.id}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Toll</Label><Input type="number" value={e.toll ?? ""} onChange={(ev) => setE({ ...e, toll: Number(ev.target.value) })} /></div>
                  <div><Label>Other</Label><Input type="number" value={e.other ?? ""} onChange={(ev) => setE({ ...e, other: Number(ev.target.value) })} /></div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => {
                  if (!e.tripId || !e.vehicleId) return toast.error("Fill fields");
                  const total = (e.toll ?? 0) + (e.other ?? 0);
                  addExpense({ id: `E${expenses.length + 1}`, tripId: e.tripId, vehicleId: e.vehicleId, toll: e.toll ?? 0, other: e.other ?? 0, total, status: "Pending" });
                  toast.success("Expense added"); setOpenExp(false); setE({});
                }}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="p-0 overflow-hidden mb-4">
        <div className="p-4 border-b border-border/60 font-medium">Fuel Log</div>
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/40">
            <tr className="text-left"><th className="p-3">Vehicle</th><th>Date</th><th>Liters</th><th>Cost</th></tr>
          </thead>
          <tbody>
            {fuelLogs.map((r) => (
              <tr key={r.id} className="border-t border-border/40">
                <td className="p-3 font-mono">{r.vehicleId}</td>
                <td>{r.date}</td>
                <td>{r.liters} L</td>
                <td>₹{r.cost.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="p-0 overflow-hidden mb-4">
        <div className="p-4 border-b border-border/60 font-medium">Other Expenses (Toll / Misc)</div>
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/40">
            <tr className="text-left"><th className="p-3">Trip</th><th>Vehicle</th><th>Toll</th><th>Other</th><th>Total</th><th>Status</th></tr>
          </thead>
          <tbody>
            {expenses.map((r) => (
              <tr key={r.id} className="border-t border-border/40">
                <td className="p-3 font-mono">{r.tripId}</td>
                <td>{r.vehicleId}</td>
                <td>₹{r.toll}</td>
                <td>₹{r.other}</td>
                <td>₹{r.total.toLocaleString()}</td>
                <td><StatusBadge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="flex justify-end text-sm">
        <div className="text-right">
          <div className="text-muted-foreground">Total operational cost (Fuel + Maintenance + Expenses)</div>
          <div className="text-2xl font-semibold text-primary">₹{grand.toLocaleString()}</div>
        </div>
      </div>
    </AppShell>
  );
}