import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore, type Role } from "@/lib/mock-data";

export const Route = createFileRoute("/auth")({ component: AuthPage });

function AuthPage() {
  const setRole = useStore((s) => s.setRole);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRoleLocal] = useState<Role>("Fleet Manager");
  const [error, setError] = useState("");

  return (
    <div className="dark min-h-screen bg-background text-foreground grid lg:grid-cols-[420px_1fr]">
      <div className="hidden lg:flex flex-col justify-between p-10 border-r border-border/60 bg-card/40">
        <div>
          <div className="text-2xl font-bold text-primary">TransitOps</div>
          <div className="text-sm text-muted-foreground mt-1">
            Smart Transport Operations Platform
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <div className="text-muted-foreground uppercase tracking-wider text-xs">
            One login, four roles
          </div>
          <ul className="space-y-2">
            <li>• Fleet Manager — Fleet, Maintenance</li>
            <li>• Dispatcher — Dashboard, Trips</li>
            <li>• Safety Officer — Drivers, Compliance</li>
            <li>• Financial Analyst — Fuel & Expenses, Analytics</li>
          </ul>
        </div>
        <div className="text-xs text-muted-foreground">TransitOps © 2026</div>
      </div>
      <div className="flex items-center justify-center p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email || !password) {
              setError("Invalid credentials. Account locked after 3 failed attempts.");
              return;
            }
            setRole(role);
            navigate({ to: "/dashboard" });
          }}
          className="w-full max-w-sm space-y-5"
        >
          <div>
            <h1 className="text-2xl font-semibold">Sign in to your account</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your credentials to continue.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="fleet@transitops.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pw">Password</Label>
            <Input
              id="pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Select value={role} onValueChange={(v) => setRoleLocal(v as Role)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fleet Manager">Fleet Manager</SelectItem>
                <SelectItem value="Dispatcher">Dispatcher</SelectItem>
                <SelectItem value="Safety Officer">Safety Officer</SelectItem>
                <SelectItem value="Financial Analyst">Financial Analyst</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && (
            <div className="rounded-md border border-destructive/60 bg-destructive/10 p-3 text-xs text-destructive">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Access is scoped to role after login.
          </p>
        </form>
      </div>
    </div>
  );
}