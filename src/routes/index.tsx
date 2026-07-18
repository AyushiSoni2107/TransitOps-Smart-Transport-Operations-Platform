import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    const role = typeof window !== "undefined" ? localStorage.getItem("transitops:role") : null;
    navigate({ to: role ? "/dashboard" : "/auth", replace: true });
  }, [navigate]);
  return <div className="min-h-screen bg-background" />;
}
