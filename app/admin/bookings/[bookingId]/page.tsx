import { adminDb } from "@/lib/firebase-admin";
import { Booking, Driver } from "@/types";
import { notFound } from "next/navigation";
import { BookingDetail } from "@/components/admin/BookingDetail";
import { getDrivers } from "@/lib/actions/driver.actions";
import { serializeDoc } from "@/lib/utils";

export default async function BookingPage(props: {
  params: Promise<{ bookingId: string }>
}) {
  const params = await props.params;
  if (!adminDb) return notFound();

  const doc = await adminDb.collection("bookings").doc(params.bookingId).get();
  if (!doc.exists) return notFound();

  const booking = { id: doc.id, ...serializeDoc(doc.data()) } as Booking;
  
  const driversRes = await getDrivers();
  const drivers = driversRes.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Booking Details</h1>
        <p className="text-muted-foreground">
          View details and manage status for booking ID: {booking.id}
        </p>
      </div>

      <BookingDetail booking={booking} drivers={drivers} />
    </div>
  );
}
