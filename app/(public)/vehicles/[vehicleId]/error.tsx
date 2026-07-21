"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function VehicleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("VEHICLE ERROR CAUGHT:", error);
  }, [error]);

  return (
    <div className="p-10 bg-red-500/10 border-red-500">
      <h1 className="text-2xl font-bold text-red-500 mb-4">Caught by Vehicle Error Boundary!</h1>
      <pre className="text-sm">{error.message}</pre>
      <pre className="text-xs text-blue-500">{error.stack}</pre>
    </div>
  );
}
