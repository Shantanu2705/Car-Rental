import { Suspense } from "react";
import { CheckoutClient } from "@/components/public/CheckoutClient";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Checkout | Apex Travel",
  description: "Complete your booking securely.",
};

function CheckoutFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="bg-muted/30 min-h-screen">
      <Suspense fallback={<CheckoutFallback />}>
        <CheckoutClient />
      </Suspense>
    </div>
  );
}
