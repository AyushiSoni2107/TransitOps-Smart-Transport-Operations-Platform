import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useStore, ROLE_ACCESS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Truck,
  Users,
  Route as RouteIcon,
  Wrench,
  Fuel,
  BarChart3,
  Settings as SettingsIcon,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { key: "dashboard", to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "fleet", to: "/fleet", label: "Fleet", icon: Truck },
  { key: "drivers", to: "/drivers", label: "Drivers", icon: Users },
  { key: "trips", to: "/trips", label: "Trips", icon: RouteIcon },
  { key: "maintenance", to: "/maintenance", label: "Maintenance", icon: Wrench },
  { key: "fuel", to: "/fuel", label: "Fuel & Expenses", icon: Fuel },
  { key: "analytics", to: "/analytics", label: "Analytics", icon: BarChart3 },
  { key: "settings", to: "/settings", label: "Settings", icon: SettingsIcon },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const role = useStore((s) => s.role);
  const setRole = useStore((s) => s.setRole);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!role && typeof window !== "undefined") {
      const saved = localStorage.getItem("transitops:role");
      if (saved) setRole(saved as never);
      else navigate({ to: "/auth" });
    }
  }, [role, setRole, navigate]);

  if (!role) return null;
  const allowed = ROLE_ACCESS[role];

  return (
    <div className="dark flex min-h-screen bg-background text-foreground">
      <aside className="w-60 shrink-0 border-r border-border/60 bg-card/40 p-4 flex flex-col">
        <div className="mb-8 px-2">
          <div className="text-lg font-bold text-primary">TransitOps</div>
          <div className="text-xs text-muted-foreground">{role}</div>
        </div>
        <nav className="flex-1 space-y-1">
          {NAV.filter((n) => allowed.includes(n.key)).map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <Button
          variant="ghost"
          size="sm"
          className="justify-start text-muted-foreground"
          onClick={() => {
            setRole(null);
            navigate({ to: "/auth" });
          }}
        >
          <LogOut className="h-4 w-4 mr-2" /> Sign out
        </Button>
      </aside>
      <div className="flex-1 min-w-0">
        <header className="flex items-center justify-between border-b border-border/60 px-6 py-3">
          <input
            placeholder="Search..."
            className="w-72 bg-transparent border border-border/60 rounded-md px-3 py-1.5 text-sm outline-none focus:border-primary"
          />
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{role}</span>
            <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">
              {role[0]}
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}