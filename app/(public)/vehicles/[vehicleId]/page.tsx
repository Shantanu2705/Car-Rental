export default async function VehicleDetailsPage(props: {
  params: Promise<{ vehicleId: string }>
}) {
  const params = await props.params;
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="bg-green-500/10 text-green-500 border border-green-500 rounded-lg p-6 max-w-lg">
        <h1 className="text-xl font-bold mb-2">DEBUG MODE: MOCK DATA</h1>
        <p>If you can see this, it means Firebase Admin was crashing the server and bypassing the error boundaries!</p>
        <p>Vehicle ID: {params.vehicleId}</p>
      </div>
    </div>
  );
}
