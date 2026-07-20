import { adminDb } from "@/lib/firebase-admin";
import { Route, VehiclePricing, Vehicle } from "@/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Navigation, CheckCircle2 } from "lucide-react";

export default async function RouteDetailsPage(props: {
  params: Promise<{ routeId: string }>
}) {
  const params = await props.params;
  if (!adminDb) return notFound();

  let doc;
  try {
    doc = await adminDb.collection("routes").doc(params.routeId).get();
  } catch (error: any) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="bg-destructive/10 text-destructive border border-destructive rounded-lg p-6 max-w-lg">
          <h1 className="text-xl font-bold mb-2">Database Connection Error</h1>
          <p className="mb-4">Failed to fetch data from Firestore. Please check your Vercel Environment Variables and Service Account permissions.</p>
          <pre className="bg-black/10 p-4 rounded text-xs overflow-auto">
            {error?.message || String(error)}
          </pre>
        </div>
      </div>
    );
  }

  if (!doc.exists) return notFound();

  const route = { id: doc.id, ...doc.data() } as Route;

  // Ideally we would fetch pricing and available vehicles here as well to display them
  // For now, we focus on the Route Details

  return (
    <div className="bg-background min-h-screen">
      {/* Route Hero */}
      <div className="relative h-[50vh] md:h-[60vh] flex items-end pb-12">
        <div className="absolute inset-0 bg-muted">
           {route.image && (
             <img 
               src={route.image} 
               alt={route.name}
               className="object-cover w-full h-full"
             />
           )}
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="flex gap-2 mb-4">
              <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                {route.isMostBooked ? "Most Booked" : "Featured Route"}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 drop-shadow-md">
              {route.name}
            </h1>
            
            <div className="flex flex-wrap gap-6 text-sm font-medium text-muted-foreground bg-card/40 backdrop-blur-md p-4 rounded-xl border border-border/50 inline-flex">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>From <strong className="text-foreground">{route.pickup}</strong> to <strong className="text-foreground">{route.destination}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>Est. {route.estimatedHours} Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-primary" />
                <span>{route.distanceKm} KM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">About This Journey</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                {route.description}
              </div>
            </section>

            {route.locations && route.locations.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Suggested Itinerary</h2>
                <div className="bg-card border border-border rounded-xl p-6">
                  <ol className="relative border-l border-muted-foreground/30 ml-3 space-y-6">
                    {route.locations.map((loc, idx) => (
                      <li key={idx} className="ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3 ring-4 ring-background text-primary-foreground text-xs font-bold">
                          {idx + 1}
                        </span>
                        <h3 className="font-semibold text-foreground">{loc.title}</h3>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            )}

            {route.gallery && route.gallery.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {route.gallery.map((img, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden border border-border bg-muted">
                      <img src={img} alt={`${route.name} ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-card border border-border rounded-xl shadow-xl overflow-hidden">
              <div className="bg-muted p-6 border-b border-border text-center">
                <p className="text-muted-foreground mb-1">Starting from</p>
                <p className="text-4xl font-bold text-foreground">₹{route.startingPrice}</p>
                <p className="text-sm text-muted-foreground mt-2">Price varies by vehicle selection</p>
              </div>
              <div className="p-6 space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>Private comfortable vehicle</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>Professional experienced driver</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>Fuel and toll taxes included</span>
                  </li>
                </ul>
                <Link href={`/book/${route.id}`} className="block">
                  <Button size="lg" className="w-full text-lg h-14">
                    Book This Route
                  </Button>
                </Link>
                <p className="text-center text-xs text-muted-foreground">
                  Free cancellation up to 48 hours before pickup.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
