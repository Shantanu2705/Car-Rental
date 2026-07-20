import { DriverForm } from "@/components/admin/DriverForm";
import { adminDb } from "@/lib/firebase-admin";
import { Driver } from "@/types";
import { serializeDoc } from "@/lib/utils";

export default async function DriverPage(props: {
  params: Promise<{ driverId: string }>
}) {
  const params = await props.params;
  const isNew = params.driverId === "new";
  let driver: Driver | null = null;

  if (!isNew && adminDb) {
    const doc = await adminDb.collection("drivers").doc(params.driverId).get();
    if (doc.exists) {
      driver = { id: doc.id, ...serializeDoc(doc.data()) } as Driver;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {isNew ? "Add Driver" : "Edit Driver"}
        </h1>
        <p className="text-muted-foreground">
          {isNew ? "Add a new driver to your personnel." : "Modify existing driver details."}
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <DriverForm initialData={driver || undefined} />
      </div>
    </div>
  );
}
