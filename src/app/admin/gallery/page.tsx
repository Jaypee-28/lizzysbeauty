import { prisma } from "@/lib/db";
import { GalleryClient } from "@/components/admin/gallery-client";
import { Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
          Gallery Management
          <Sparkles size={28} className="text-[#FF4D8D]" />
        </h1>
        <p className="text-gray-500 font-semibold mt-1">
          Upload and manage your portfolio images. Star an image to feature it on the homepage.
        </p>
      </div>

      <GalleryClient images={images} />
    </div>
  );
}
