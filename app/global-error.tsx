"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
          <div className="bg-destructive/10 text-destructive border border-destructive rounded-lg p-6 max-w-2xl w-full shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Application Error</h1>
            <p className="mb-4">Something went wrong while rendering this page on the server.</p>
            <div className="bg-black/80 text-green-400 p-4 rounded text-xs overflow-auto font-mono mb-6 max-h-64 whitespace-pre-wrap">
              <span className="text-red-400 font-bold">Error Message:</span> {error.message}
              <br /><br />
              <span className="text-blue-400 font-bold">Stack Trace:</span>
              <br />
              {error.stack}
            </div>
            <Button onClick={() => reset()} className="w-full">
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
