import { auth } from "@/auth.node";
import { redirect } from "next/navigation";
import { bookingService } from "@/modules/bookings/booking.service";
import { sanitizeData } from "@/lib/utils";
import { BookingsContent } from "@/components/shop/bookings-content";

export const metadata = {
  title: "My Bookings | Lizzy's Beauty Studio",
  description: "View and track your Lizzy's Beauty Studio appointments",
};

export default async function BookingsPage() {
  const session = await auth();

  // We require the user to be logged in to view their bookings history
  if (!session?.user?.email) {
    redirect("/login?callbackUrl=/bookings");
  }

  // Fetch bookings associated with the user's logged-in email
  const rawBookings = await bookingService.getUserBookings(session.user.email);
  const bookings = sanitizeData(rawBookings) as any;

  return <BookingsContent bookings={bookings} />;
}
