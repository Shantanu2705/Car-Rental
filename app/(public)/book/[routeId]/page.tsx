import { adminDb } from "@/lib/firebase-admin";
import { Route, Vehicle, VehiclePricing } from "@/types";
import { notFound } from "next/navigation";
import { BookingForm } from "@/components/public/BookingForm";
import { MapPin, Clock } from "lucide-react";
import { serializeDoc } from "@/lib/utils";

export default async function BookRoutePage(props: {
  params: Promise<{ routeId: string }>
}) {
  const params = await props.params;
  if (!adminDb) return notFound();

  // Fetch Route
  let routeDoc, vehiclesSnap, pricingSnap;
  try {
    routeDoc = await adminDb.collection("routes").doc(params.routeId).get();
    if (!routeDoc.exists) return notFound();
    
    // 2. Fetch available vehicles
    vehiclesSnap = await adminDb.collection("vehicles").where("status", "==", "AVAILABLE").get();
    
    // 3. Fetch pricing for this route
    pricingSnap = await adminDb.collection("pricing").where("routeId", "==", routeDoc.id).get();
  } catch (error: any) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="bg-destructive/10 text-destructive border border-destructive rounded-lg p-6 max-w-lg">
          <h1 className="text-xl font-bold mb-2">Database Connection Error</h1>
          <p className="mb-4">Failed to fetch booking data from Firestore.</p>
          <pre className="bg-black/10 p-4 rounded text-xs overflow-auto">
            {error?.message || String(error)}
          </pre>
        </div>
      </div>
    );
  }

  const route = { id: routeDoc.id, ...serializeDoc(routeDoc.data()) } as Route;
  const vehicles = vehiclesSnap.docs.map(doc => ({ id: doc.id, ...serializeDoc(doc.data()) })) as Vehicle[];
  const pricing = pricingSnap.docs.map(doc => ({ id: doc.id, ...serializeDoc(doc.data()) })) as VehiclePricing[];

  return (
    <div className="bg-muted/30 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <BookingForm route={route} vehicles={vehicles} pricing={pricing} />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl shadow-xl overflow-hidden sticky top-28">
              <div className="aspect-video bg-muted relative">
                {route.image && <img src={route.image} alt={route.name} className="w-full h-full object-cover" />}
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white drop-shadow-md">
                  {route.name}
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{route.pickup} to {route.destination}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Est. {route.estimatedHours} Hours ({route.distanceKm} KM)</span>
                </div>
                
                <div className="border-t border-border pt-4 mt-4">
                  <h4 className="font-bold mb-2">Why book with us?</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ No hidden charges</li>
                    <li>✓ Professional verified drivers</li>
                    <li>✓ Well-maintained premium fleet</li>
                    <li>✓ 24/7 Support during your journey</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
