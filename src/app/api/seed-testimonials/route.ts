import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const testimonials = [
      {
        name: "Sarah Jenkins",
        email: "sarah@example.com",
        message: "Lizzy's Beauty Studio completely transformed my nail care routine. The attention to detail is unmatched, and my gel manicures last longer than ever before.",
        rating: 5,
        isApproved: true,
      },
      {
        name: "Emily Rodriguez",
        email: "emily@example.com",
        message: "I booked Lizzy for my bridal party and the experience was incredible. We felt so pampered, and our nails looked flawless for the wedding photos.",
        rating: 5,
        isApproved: true,
      },
      {
        name: "Jessica Chen",
        email: "jessica@example.com",
        message: "The most relaxing, hygienic, and premium salon experience I've had in the city. The staff is so welcoming and talented.",
        rating: 5,
        isApproved: true,
      },
    ];

    for (const t of testimonials) {
      await prisma.testimonial.create({
        data: t
      });
    }

    return NextResponse.json({ success: true, message: "Testimonials seeded successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
