import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { caption, isFeatured } = body;

    const image = await prisma.galleryImage.update({
      where: { id },
      data: {
        caption,
        isFeatured,
      },
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error("[GALLERY_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const image = await prisma.galleryImage.delete({
      where: { id },
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error("[GALLERY_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
