import { NextRequest, NextResponse } from "next/server";
import { bookingSchema } from "@/modules/bookings/booking.schema";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { Prisma } from "@/generated/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = bookingSchema.parse(body);

    // 1. Fetch the service to calculate prices securely
    const service = await prisma.service.findUnique({
      where: { id: validatedData.serviceId },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // 2. Calculate financial values
    const fullPriceNum = Number(service.fullPrice || 0);
    const depositPercentage = service.depositPercentage || 50;
    const depositAmount = (fullPriceNum * depositPercentage) / 100;
    const outstandingBalance = fullPriceNum - depositAmount;

    // 3. Create the booking with PENDING_PAYMENT status
    const booking = await prisma.booking.create({
      data: {
        serviceId: validatedData.serviceId,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        preferredDate: validatedData.preferredDate,
        preferredTime: validatedData.preferredTime,
        notes: validatedData.notes,
        status: "PENDING_PAYMENT",
        fullPrice: new Prisma.Decimal(fullPriceNum),
        depositPaid: new Prisma.Decimal(0),
        outstandingBalance: new Prisma.Decimal(fullPriceNum), // Will be updated when deposit is paid
      },
    });

    // 4. If deposit is 0, just confirm the booking directly?
    // Wait, the requirement says Stripe Deposit Payment. If deposit is 0, we could skip Stripe.
    if (depositAmount <= 0) {
      const updatedBooking = await prisma.booking.update({
        where: { id: booking.id },
        data: { status: "CONFIRMED" }
      });
      return NextResponse.json({ url: "/booking/success" });
    }

    // 5. Create Stripe Checkout Session
    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    
    // We get the store currency from settings
    const settings = await prisma.setting.findFirst();
    const currency = settings?.currency?.toLowerCase() || "gbp";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: validatedData.email,
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: `Deposit for ${service.name}`,
              description: `Appointment on ${validatedData.preferredDate.toLocaleDateString()} at ${validatedData.preferredTime}`,
              images: service.imageUrl ? [service.imageUrl] : undefined,
            },
            unit_amount: Math.round(depositAmount * 100), // Stripe expects cents/pence
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookingId: booking.id,
        type: "SERVICE_DEPOSIT"
      },
      success_url: `${origin}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/booking?serviceId=${service.id}&canceled=true`,
    });

    // 6. Save the payment intent ID to the booking (Stripe Checkout Session doesn't have payment_intent immediately sometimes, but we will store the session id or payment intent via webhook)
    if (session.payment_intent) {
        await prisma.booking.update({
            where: { id: booking.id },
            data: { stripePaymentIntentId: session.payment_intent as string }
        });
    }

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
