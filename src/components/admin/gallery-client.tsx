"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ui/image-upload";
import { Trash2, Star, Sparkles } from "lucide-react";
import { GalleryImage } from "@/generated/prisma";

export const GalleryClient = ({ images }: { images: GalleryImage[] }) => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [caption, setCaption] = useState("");

  const handleUpload = async () => {
    if (!newImage) return;
    setIsUploading(true);
    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: newImage, caption }),
      });
      if (!response.ok) throw new Error("Failed to add image");
      toast.success("Image added to gallery");
      setNewImage("");
      setCaption("");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      const response = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete image");
      toast.success("Image deleted");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const toggleFeatured = async (id: string, isFeatured: boolean) => {
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !isFeatured }),
      });
      if (!response.ok) throw new Error("Failed to update status");
      toast.success("Image status updated");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-xl">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="text-pink-500" size={20} />
          Add New Image
        </h2>
        <div className="space-y-4">
          <ImageUpload
            value={newImage}
            onChange={(url) => setNewImage(url)}
            onRemove={() => setNewImage("")}
            label="Upload Gallery Image"
          />
          {newImage && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Image caption (optional)"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full rounded-lg border-gray-300 border py-2 px-3 text-sm focus:border-black focus:ring-black"
              />
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full rounded-lg bg-black text-white font-bold py-2 hover:bg-gray-800 disabled:opacity-50"
              >
                {isUploading ? "Adding..." : "Add to Gallery"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm">
            <Image src={img.url} alt={img.caption || "Gallery Image"} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
              <div className="flex justify-between items-start">
                <button
                  onClick={() => toggleFeatured(img.id, img.isFeatured)}
                  className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                    img.isFeatured ? "bg-yellow-400/90 text-white" : "bg-white/20 text-white hover:bg-white/40"
                  }`}
                  title={img.isFeatured ? "Remove from Featured" : "Feature on Homepage"}
                >
                  <Star size={16} fill={img.isFeatured ? "currentColor" : "none"} />
                </button>

                <button
                  onClick={() => handleDelete(img.id)}
                  className="p-2 rounded-full bg-red-500/80 text-white hover:bg-red-600 backdrop-blur-md transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {img.caption && (
                <p className="text-white text-xs font-medium truncate drop-shadow-md">
                  {img.caption}
                </p>
              )}
            </div>
          </div>
        ))}

        {images.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 font-medium">
            No images in your gallery yet.
          </div>
        )}
      </div>
    </div>
  );
};
