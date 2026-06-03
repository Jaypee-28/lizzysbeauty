import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(images);
  } catch (error) {
    console.error("[GALLERY_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, caption, isFeatured } = body;

    if (!url) {
      return new NextResponse("URL is required", { status: 400 });
    }

    const image = await prisma.galleryImage.create({
      data: {
        url,
        caption,
        isFeatured: isFeatured || false,
      },
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error("[GALLERY_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
