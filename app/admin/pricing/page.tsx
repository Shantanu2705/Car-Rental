import { getRoutes } from "@/lib/actions/route.actions";
import { getVehicles } from "@/lib/actions/vehicle.actions";
import { PricingManager } from "@/components/admin/PricingManager";

export default async function PricingPage() {
  const [routesResult, vehiclesResult] = await Promise.all([
    getRoutes(),
    getVehicles()
  ]);

  const routes = routesResult.data || [];
  const vehicles = vehiclesResult.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dynamic Pricing</h1>
        <p className="text-muted-foreground">Manage prices for specific routes, vehicles, and trip types.</p>
      </div>

      <PricingManager routes={routes} vehicles={vehicles} />
    </div>
  );
}
