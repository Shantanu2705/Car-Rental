import { VehicleForm } from "@/components/admin/VehicleForm";
import { adminDb } from "@/lib/firebase-admin";
import { Vehicle } from "@/types";
import { serializeDoc } from "@/lib/utils";

export default async function VehiclePage(props: {
  params: Promise<{ vehicleId: string }>
}) {
  const params = await props.params;
  const isNew = params.vehicleId === "new";
  let vehicle: Vehicle | null = null;

  if (!isNew && adminDb) {
    const doc = await adminDb.collection("vehicles").doc(params.vehicleId).get();
    if (doc.exists) {
      vehicle = { id: doc.id, ...serializeDoc(doc.data()) } as Vehicle;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {isNew ? "Add Vehicle" : "Edit Vehicle"}
        </h1>
        <p className="text-muted-foreground">
          {isNew ? "Add a new vehicle to your fleet." : "Modify existing vehicle details."}
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <VehicleForm initialData={vehicle || undefined} />
      </div>
    </div>
  );
}
