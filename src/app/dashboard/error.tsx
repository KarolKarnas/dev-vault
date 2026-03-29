"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
      <div className="rounded-full bg-destructive/10 p-3">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <div className="text-center">
        <h2 className="text-lg font-semibold">Something went wrong</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {error.message || "Failed to load dashboard data."}
        </p>
      </div>
      <Button onClick={reset} variant="outline" size="sm">
        Try again
      </Button>
    </div>
  );
}
