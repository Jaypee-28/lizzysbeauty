import { NextResponse } from "next/server";
import { newsletterService } from "@/modules/newsletter/newsletter.service";
import { SubscribeNewsletterSchema } from "@/modules/newsletter/newsletter.schema";

// POST - Subscribe to newsletter
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = SubscribeNewsletterSchema.parse(body);
    const subscriber = await newsletterService.subscribe(data);
    return NextResponse.json(subscriber, { status: 201 });
  } catch (error: any) {
    if (error.message === "Email is already subscribed.") {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    return NextResponse.json({ error: error.message || "Failed to subscribe" }, { status: 400 });
  }
}

// GET - Get all subscribers (Admin)
export async function GET() {
  try {
    const subscribers = await newsletterService.getAllSubscribers();
    return NextResponse.json(subscribers);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 });
  }
}
