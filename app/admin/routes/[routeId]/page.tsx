import { RouteForm } from "@/components/admin/RouteForm";
import { adminDb } from "@/lib/firebase-admin";
import { Route } from "@/types";
import { serializeDoc } from "@/lib/utils";
import { getDrivers } from "@/lib/actions/driver.actions";

export default async function RoutePage(props: {
  params: Promise<{ routeId: string }>
}) {
  const params = await props.params;
  const isNew = params.routeId === "new";
  let route: Route | null = null;

  if (!isNew && adminDb) {
    const doc = await adminDb.collection("routes").doc(params.routeId).get();
    if (doc.exists) {
      route = { id: doc.id, ...serializeDoc(doc.data()) } as Route;
    }
  }

  const driversRes = await getDrivers();
  const drivers = driversRes.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {isNew ? "Create Route" : "Edit Route"}
        </h1>
        <p className="text-muted-foreground">
          {isNew ? "Add a new travel route." : "Modify existing route details."}
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <RouteForm initialData={route || undefined} drivers={drivers} />
      </div>
    </div>
  );
}
