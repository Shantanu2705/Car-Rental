import { getBookings } from "@/lib/actions/booking.actions";
import { BookingsClient } from "./BookingsClient";

export default async function BookingsPage() {
  const result = await getBookings();
  const bookings = result.data || [];

  return <BookingsClient initialBookings={bookings} />;
}
