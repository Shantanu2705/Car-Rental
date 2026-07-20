import Link from "next/link";
import { getRoutes } from "@/lib/actions/route.actions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Popular Routes | Apex Travel",
  description: "Explore our popular car rental and tour routes in the North East.",
};

export default async function PublicRoutesPage() {
  const result = await getRoutes();
  const routes = (result.data || []).filter(r => r.status === "ACTIVE");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Discover Our Routes</h1>
        <p className="text-xl text-muted-foreground">
          Journey through the breathtaking landscapes of the North East with our premium fleet and experienced drivers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {routes.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No routes available at the moment. Please check back later.
          </div>
        ) : (
          routes.map((route) => (
            <Link key={route.id} href={`/routes/${route.id}`} className="group block">
              <Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 h-full flex flex-col bg-card/50 hover:bg-card">
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  {route.image ? (
                    <img 
                      src={route.image} 
                      alt={route.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      No Image Available
                    </div>
                  )}
                  {route.isMostBooked && (
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      Most Booked
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{route.name}</h3>
                  
                  <div className="space-y-2 mb-6 text-sm text-muted-foreground flex-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{route.pickup} to {route.destination}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{route.estimatedHours} Hours • {route.distanceKm} KM</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-border/50">
                    <div>
                      <p className="text-xs text-muted-foreground">Starting from</p>
                      <p className="text-lg font-bold text-foreground">₹{route.startingPrice}</p>
                    </div>
                    <Button variant="ghost" className="gap-1 group-hover:text-primary group-hover:bg-primary/10">
                      Details <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
