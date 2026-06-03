import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { sendBookingConfirmationEmail } from "@/modules/emails/booking-email";

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const signature = headerList.get("stripe-signature") as string;

  let event;

  try {
    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error("Missing signature or webhook secret");
    }
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as any;
      const bookingId = session.metadata?.bookingId;
      const type = session.metadata?.type;

      if (type === "SERVICE_DEPOSIT" && bookingId) {
        console.log(`[Stripe Webhook] Service deposit paid for booking: ${bookingId}`);
        const amountPaid = session.amount_total ? session.amount_total / 100 : 0;
        
        const booking = await prisma.booking.findUnique({ 
          where: { id: bookingId }, 
          include: { service: true } 
        });
        
        if (booking) {
          const outstandingBalance = Number(booking.fullPrice) - amountPaid;
          const updatedBooking = await prisma.booking.update({
            where: { id: bookingId },
            data: {
              status: "CONFIRMED",
              depositPaid: amountPaid,
              outstandingBalance: outstandingBalance,
            }
          });
          
          try {
            await sendBookingConfirmationEmail(updatedBooking, booking.service);
          } catch (emailError) {
            console.error("Failed to send booking confirmation email:", emailError);
          }
        }
      }
      break;
    }

    default:
      console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
