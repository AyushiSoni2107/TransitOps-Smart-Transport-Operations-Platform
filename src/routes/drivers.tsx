import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { useStore, type Driver } from "@/lib/mock-data";
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
import { Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/drivers")({ component: DriversPage });

function DriversPage() {
  const { drivers, addDriver } = useStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<Driver>>({ category: "LMV", status: "Available" });

  const submit = () => {
    if (!form.name || !form.license) return toast.error("Name and license required");
    addDriver({
      id: `D${String(drivers.length + 1).padStart(3, "0")}`,
      name: form.name!,
      license: form.license!,
      category: form.category as Driver["category"],
      expiry: form.expiry ?? "—",
      contact: form.contact ?? "—",
      tripsCompleted: 0,
      safetyScore: 100,
      status: "Available",
    });
    toast.success("Driver added");
    setOpen(false);
    setForm({ category: "LMV", status: "Available" });
  };

  return (
    <AppShell>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Drivers & Safety Profiles</h1>
          <p className="text-sm text-muted-foreground">Compliance and trip history</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-1" /> Add Driver</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Onboard driver</DialogTitle></DialogHeader>
            <div className="grid gap-3">
              <div><Label>Name</Label><Input value={form.name ?? ""} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div><Label>License #</Label><Input value={form.license ?? ""} onChange={(e) => setForm({ ...form, license: e.target.value })} /></div>
              <div><Label>Expiry</Label><Input value={form.expiry ?? ""} onChange={(e) => setForm({ ...form, expiry: e.target.value })} placeholder="MM/YYYY" /></div>
              <div><Label>Contact</Label><Input value={form.contact ?? ""} onChange={(e) => setForm({ ...form, contact: e.target.value })} /></div>
            </div>
            <DialogFooter><Button onClick={submit}>Add</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/40">
            <tr className="text-left">
              <th className="p-3">Driver</th>
              <th>License</th>
              <th>Category</th>
              <th>Expiry</th>
              <th>Contact</th>
              <th>Trips</th>
              <th>Safety</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((d) => (
              <tr key={d.id} className="border-t border-border/40">
                <td className="p-3">{d.name}</td>
                <td className="font-mono text-xs">{d.license}</td>
                <td>{d.category}</td>
                <td className={d.expiry.includes("EXPIRED") ? "text-rose-400" : ""}>{d.expiry}</td>
                <td>{d.contact}</td>
                <td>{d.tripsCompleted}</td>
                <td>{d.safetyScore}%</td>
                <td><StatusBadge status={d.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="text-xs text-muted-foreground mt-3">
        Rule: Expired license or Suspended status blocks driver from Trip Dispatcher.
      </p>
    </AppShell>
  );
}