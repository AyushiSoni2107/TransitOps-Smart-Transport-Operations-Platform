import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { useStore } from "@/lib/mock-data";
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

export const Route = createFileRoute("/trips")({ component: TripsPage });

function TripsPage() {
  const { vehicles, drivers, trips, addTrip, updateTrip } = useStore();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleId, setVehicleId] = useState<string>("");
  const [driverId, setDriverId] = useState<string>("");
  const [cargoKg, setCargoKg] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);

  const eligibleVehicles = vehicles.filter((v) => v.status === "Available");
  const eligibleDrivers = drivers.filter(
    (d) => d.status === "Available" && !d.expiry.includes("EXPIRED"),
  );

  const selectedVehicle = vehicles.find((v) => v.id === vehicleId);
  const capacityError = selectedVehicle && cargoKg > selectedVehicle.capacityKg;

  const canDispatch = origin && destination && vehicleId && driverId && cargoKg > 0 && !capacityError;

  const dispatch = () => {
    const id = `TR${String(trips.length + 1).padStart(3, "0")}`;
    addTrip({
      id,
      vehicleId,
      driverId,
      origin,
      destination,
      cargoKg,
      distanceKm: distance,
      eta: `${Math.max(1, Math.round((distance / 60) * 60))} min`,
      status: "Dispatched",
    });
    useStore.getState().updateVehicle(vehicleId, { status: "On Trip" });
    toast.success(`Trip ${id} dispatched`);
    setOrigin(""); setDestination(""); setCargoKg(0); setDistance(0); setVehicleId(""); setDriverId("");
  };

  const board = useMemo(() => trips.filter((t) => t.status === "Dispatched"), [trips]);

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold mb-6">Trip Dispatcher</h1>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="font-medium mb-4">Create Trip</div>

          <div className="flex items-center gap-2 mb-4 text-xs">
            <div className="flex-1 h-1 bg-primary rounded" />
            <div className="flex-1 h-1 bg-primary rounded" />
            <div className="flex-1 h-1 bg-muted rounded" />
          </div>

          <div className="grid gap-3">
            <div><Label>Origin</Label><Input value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Bommanagar Depot" /></div>
            <div><Label>Destination</Label><Input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Anandanand Hub" /></div>
            <div>
              <Label>Vehicle (available only)</Label>
              <Select value={vehicleId} onValueChange={setVehicleId}>
                <SelectTrigger><SelectValue placeholder="Select vehicle" /></SelectTrigger>
                <SelectContent>
                  {eligibleVehicles.map((v) => (
                    <SelectItem key={v.id} value={v.id}>{v.id} — {v.capacityKg} kg</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Driver (valid license only)</Label>
              <Select value={driverId} onValueChange={setDriverId}>
                <SelectTrigger><SelectValue placeholder="Select driver" /></SelectTrigger>
                <SelectContent>
                  {eligibleDrivers.map((d) => (
                    <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Cargo Weight (kg)</Label><Input type="number" value={cargoKg || ""} onChange={(e) => setCargoKg(Number(e.target.value))} /></div>
              <div><Label>Planned Distance (km)</Label><Input type="number" value={distance || ""} onChange={(e) => setDistance(Number(e.target.value))} /></div>
            </div>

            {capacityError && (
              <div className="rounded-md border border-destructive/60 bg-destructive/10 p-3 text-xs text-destructive">
                Vehicle capacity: {selectedVehicle!.capacityKg} kg<br />
                Cargo weight: {cargoKg} kg<br />
                ✗ Capacity exceeded by {cargoKg - selectedVehicle!.capacityKg} kg — Dispatch blocked
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button disabled={!canDispatch} onClick={dispatch}>Dispatch</Button>
              <Button variant="outline" onClick={() => { setOrigin(""); setDestination(""); setCargoKg(0); setDistance(0); }}>Cancel</Button>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="font-medium mb-4">Live Board</div>
          {board.length === 0 && <p className="text-sm text-muted-foreground">No active trips.</p>}
          {board.map((t) => {
            const drv = drivers.find((d) => d.id === t.driverId);
            return (
              <div key={t.id} className="border border-border/60 rounded-md p-3 mb-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span className="font-mono">{t.id}</span>
                  <span>{t.vehicleId} · {drv?.name}</span>
                </div>
                <div className="text-sm">{t.origin} → {t.destination}</div>
                <div className="mt-2 flex justify-between items-center">
                  <StatusBadge status={t.status} />
                  <Button size="sm" variant="outline" onClick={() => {
                    updateTrip(t.id, { status: "Completed" });
                    useStore.getState().updateVehicle(t.vehicleId, { status: "Available" });
                    toast.success(`${t.id} completed`);
                  }}>Mark complete</Button>
                </div>
              </div>
            );
          })}
        </Card>
      </div>
    </AppShell>
  );
}