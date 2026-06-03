import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const DEFAULT_FAQS = [
  {
    category: "Booking",
    question: "How do I book a service?",
    answer: "Simply visit our Booking portal, select your desired aesthetic service, choose your preferred expert stylist, and lock in a date/time that works for your schedule."
  },
  {
    category: "Booking",
    question: "Can I reschedule my appointment?",
    answer: "Yes, you can reschedule up to 24 hours before your appointment time without any penalty. Rescheduling within 24 hours may incur a late-change fee."
  }
];

export async function POST() {
  try {
    const count = await prisma.fAQ.count();
    if (count > 0) {
      return NextResponse.json({ message: "Already seeded" });
    }

    await prisma.fAQ.createMany({
      data: DEFAULT_FAQS
    });

    return NextResponse.json({ success: true, seeded: DEFAULT_FAQS.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
