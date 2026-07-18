import { cn } from "@/lib/utils";

const MAP: Record<string, string> = {
  Available: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "On Trip": "bg-sky-500/15 text-sky-400 border-sky-500/30",
  Dispatched: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  "In Shop": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Retired: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  Suspended: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  "Off Duty": "bg-zinc-500/15 text-zinc-300 border-zinc-500/30",
  Draft: "bg-zinc-500/15 text-zinc-300 border-zinc-500/30",
  Completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Approved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        MAP[status] ?? "bg-muted text-muted-foreground border-border",
      )}
    >
      {status}
    </span>
  );
}