import { prisma } from "@/lib/db";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D8D] to-pink-400">Portfolio</span>
          </h1>
          <p className="text-lg text-gray-500 font-medium leading-relaxed">
            Browse through our collection of premium nail designs, esthetic treatments, and luxurious transformations.
          </p>
        </div>

        <GalleryGrid images={images} />
      </div>
    </div>
  );
}
