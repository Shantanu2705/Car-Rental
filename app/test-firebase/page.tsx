export const dynamic = "force-dynamic";

export default async function TestFirebase() {
  try {
    const admin = await import("@/lib/firebase-admin");
    return (
      <div style={{ color: "green", padding: "20px" }}>
        <h1>FIREBASE LOADED: {admin.adminDb ? 'YES' : 'NO'}</h1>
      </div>
    );
  } catch (error: any) {
    return (
      <div style={{ color: "red", padding: "20px" }}>
        <h1 style={{ fontWeight: "bold", fontSize: "24px" }}>MODULE INITIALIZATION CRASHED</h1>
        <p><strong>Message:</strong> {error.message}</p>
        <pre style={{ fontSize: "12px", marginTop: "10px", background: "#f0f0f0", color: "#000", padding: "10px" }}>{error.stack}</pre>
        <p><strong>Stringified:</strong> {JSON.stringify(error)}</p>
      </div>
    );
  }
}
