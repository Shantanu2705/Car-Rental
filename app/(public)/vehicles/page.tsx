import Link from "next/link";
import { getVehicles } from "@/lib/actions/vehicle.actions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Settings2, Wind, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Our Premium Fleet | CarDictionary",
  description: "Explore our diverse range of premium vehicles for your North East journey.",
};

export default async function PublicVehiclesPage() {
  const result = await getVehicles();
  const vehicles = (result.data || []).filter(v => v.status === "AVAILABLE");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Our Premium Fleet</h1>
        <p className="text-xl text-muted-foreground">
          Choose the perfect vehicle for your group size and comfort preferences. All vehicles are well-maintained and driven by professionals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vehicles.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No vehicles available at the moment. Please check back later.
          </div>
        ) : (
          vehicles.map((vehicle) => (
            <Link key={vehicle.id} href={`/vehicles/${vehicle.id}`} className="group block">
              <Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 h-full flex flex-col bg-card/50 hover:bg-card">
                <div className="aspect-[16/10] bg-muted relative overflow-hidden p-6 flex items-center justify-center">
                  {vehicle.image ? (
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name}
                      className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      No Image Available
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="mb-4 flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{vehicle.name}</h3>
                      <p className="text-sm text-muted-foreground">{vehicle.type}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6 text-sm text-muted-foreground flex-1">
                    <div className="flex items-center gap-2 text-xs">
                      <Users className="w-4 h-4 text-primary shrink-0" />
                      <span>{vehicle.maxAdults + vehicle.maxChildren} Seats <span className="text-[10px] opacity-70">(+{vehicle.maxInfants} Infants)</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Briefcase className="w-4 h-4 text-primary shrink-0" />
                      <span>{vehicle.maxBags} Bags <span className="text-[10px] opacity-70">({vehicle.maxBagWeight}kg ea)</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings2 className="w-4 h-4 text-primary" />
                      <span className="capitalize">{vehicle.transmission.toLowerCase()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-primary" />
                      <span>{vehicle.ac ? "AC" : "Non-AC"}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <Button variant="ghost" className="w-full justify-between group-hover:text-primary group-hover:bg-primary/10">
                      View Specifications <ChevronRight className="w-4 h-4" />
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
