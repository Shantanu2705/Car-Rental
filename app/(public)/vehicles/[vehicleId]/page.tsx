import { adminDb } from "@/lib/firebase-admin";
import { Vehicle } from "@/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Settings2, Wind, CheckCircle2, ChevronRight, Info } from "lucide-react";

export default async function VehicleDetailsPage(props: {
  params: Promise<{ vehicleId: string }>
}) {
  const params = await props.params;
  if (!adminDb) return notFound();

  const doc = await adminDb.collection("vehicles").doc(params.vehicleId).get();
  if (!doc.exists) return notFound();

  const vehicle = { id: doc.id, ...doc.data() } as Vehicle;

  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/vehicles" className="hover:text-primary transition-colors">Vehicles</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{vehicle.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Images */}
          <div className="space-y-6">
            <div className="aspect-[4/3] bg-muted rounded-2xl flex items-center justify-center p-8 border border-border/50">
               {vehicle.image ? (
                 <img 
                   src={vehicle.image} 
                   alt={vehicle.name}
                   className="object-contain w-full h-full drop-shadow-2xl"
                 />
               ) : (
                 <div className="text-muted-foreground">No Image Available</div>
               )}
            </div>
            
            {vehicle.gallery && vehicle.gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {vehicle.gallery.map((img, i) => (
                  <div key={i} className="aspect-[4/3] bg-muted rounded-xl border border-border/50 overflow-hidden">
                    <img src={img} alt={`${vehicle.name} ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="mb-2">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">{vehicle.type}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
              {vehicle.name}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              {vehicle.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              <div className="bg-card border border-border/50 rounded-xl p-4 flex flex-col items-center text-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                <div className="text-sm">
                  <p className="font-bold">{vehicle.maxAdults + vehicle.maxChildren}</p>
                  <p className="text-muted-foreground text-xs">Passengers</p>
                </div>
              </div>
              <div className="bg-card border border-border/50 rounded-xl p-4 flex flex-col items-center text-center gap-2">
                <Briefcase className="w-6 h-6 text-primary" />
                <div className="text-sm">
                  <p className="font-bold">{vehicle.maxBags}</p>
                  <p className="text-muted-foreground text-xs">Bags</p>
                </div>
              </div>
              <div className="bg-card border border-border/50 rounded-xl p-4 flex flex-col items-center text-center gap-2">
                <Settings2 className="w-6 h-6 text-primary" />
                <div className="text-sm">
                  <p className="font-bold capitalize">{vehicle.transmission.toLowerCase()}</p>
                  <p className="text-muted-foreground text-xs">Transmission</p>
                </div>
              </div>
              <div className="bg-card border border-border/50 rounded-xl p-4 flex flex-col items-center text-center gap-2">
                <Wind className="w-6 h-6 text-primary" />
                <div className="text-sm">
                  <p className="font-bold">{vehicle.ac ? "Yes" : "No"}</p>
                  <p className="text-muted-foreground text-xs">A/C</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4">Detailed Specifications</h3>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Passenger Breakdown</p>
                  <p className="text-sm text-muted-foreground">Max {vehicle.maxAdults} Adults, {vehicle.maxChildren} Children, {vehicle.maxInfants} Infants</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Luggage Capacity</p>
                  <p className="text-sm text-muted-foreground">{vehicle.luggageCapacity} ({vehicle.maxBags} bags up to {vehicle.maxBagWeight}kg each)</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Fuel Type</p>
                  <p className="text-sm text-muted-foreground">{vehicle.fuelType}</p>
                </div>
              </li>
            </ul>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex gap-4 items-start">
                <Info className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <p className="font-medium">Ready to book this vehicle?</p>
                  <p className="text-sm text-muted-foreground">Go to our routes page to check availability and exact pricing for your journey.</p>
                </div>
              </div>
              <Link href="/routes" className="w-full sm:w-auto shrink-0">
                <Button size="lg" className="w-full">
                  Find Routes
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
