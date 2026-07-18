import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ROLE_ACCESS, type Role } from "@/lib/mock-data";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

const MODULES = ["fleet", "drivers", "trips", "maintenance", "fuel", "analytics"];
const ROLES: Role[] = ["Fleet Manager", "Dispatcher", "Safety Officer", "Financial Analyst"];

function SettingsPage() {
  return (
    <AppShell>
      <h1 className="text-2xl font-semibold mb-6">Settings & RBAC</h1>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="font-medium mb-4">General</div>
          <div className="grid gap-3">
            <div><Label>Depot Name</Label><Input defaultValue="Bommanagar Depot HQ1" /></div>
            <div><Label>Currency</Label><Input defaultValue="INR (₹)" /></div>
            <div><Label>Distance Unit</Label><Input defaultValue="Kilometers" /></div>
            <Button onClick={() => toast.success("Settings saved")}>Save Changes</Button>
          </div>
        </Card>

        <Card className="p-5">
          <div className="font-medium mb-4">Role-Based Access (View)</div>
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground uppercase">
              <tr className="text-left border-b border-border/60">
                <th className="py-2">Role</th>
                {MODULES.map((m) => (<th key={m} className="capitalize">{m}</th>))}
              </tr>
            </thead>
            <tbody>
              {ROLES.map((r) => (
                <tr key={r} className="border-b border-border/30">
                  <td className="py-2">{r}</td>
                  {MODULES.map((m) => (
                    <td key={m}>
                      {ROLE_ACCESS[r].includes(m)
                        ? <Check className="h-4 w-4 text-emerald-400" />
                        : <X className="h-4 w-4 text-muted-foreground/50" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </AppShell>
  );
}