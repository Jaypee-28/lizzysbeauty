"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Search, Camera } from "lucide-react";
import { GalleryImage } from "@/generated/prisma";
import Link from "next/link";

export const GalleryGrid = ({ images }: { images: GalleryImage[] }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Close modal on escape key
  if (typeof window !== "undefined") {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    });
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        {images.map((img, index) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
            className="relative group rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(255,77,141,0.4)] hover:-translate-y-2 transition-all duration-500 cursor-pointer border-[4px] sm:border-[6px] border-white bg-white"
            onClick={() => setSelectedImage(img)}
          >
            <div className="relative w-full aspect-[4/5] rounded-2xl sm:rounded-[1.5rem] overflow-hidden">
              <Image
                src={img.url}
                alt={img.caption || "Gallery"}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Sweet Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#FF4D8D]/90 via-[#FF4D8D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end p-4 sm:p-6 pb-6 sm:pb-8 gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-md" />
                </div>
                {img.caption && (
                  <p className="text-white font-bold text-center text-xs sm:text-lg transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-75 drop-shadow-md px-2">
                    {img.caption}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-20 text-gray-500 font-medium">
          No images in the gallery yet. Check back soon!
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/10 hover:bg-black/20 text-white md:text-black md:bg-gray-100 md:hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
                onClick={() => setSelectedImage(null)}
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-2/3 bg-gray-100 relative h-[50vh] md:h-[80vh] flex items-center justify-center p-4">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.caption || "Gallery Image"}
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="w-full md:w-1/3 p-8 flex flex-col justify-center bg-white">
                <div className="flex items-center gap-2 text-[#FF4D8D] font-bold text-sm uppercase tracking-widest mb-4">
                  <Camera size={16} />
                  Lizzy's Portfolio
                </div>
                
                {selectedImage.caption ? (
                  <p className="text-gray-900 text-lg md:text-xl font-medium leading-relaxed mb-8">
                    {selectedImage.caption}
                  </p>
                ) : (
                  <p className="text-gray-400 italic mb-8">No caption provided.</p>
                )}

                <div className="mt-auto pt-8 border-t border-gray-100">
                  <p className="text-sm text-gray-500 font-medium mb-4">Love this look?</p>
                  <Link
                    href="/booking"
                    onClick={() => setSelectedImage(null)}
                    className="flex items-center justify-center w-full py-4 bg-gradient-to-r from-[#FF4D8D] to-pink-500 text-white rounded-xl font-bold hover:shadow-[0_10px_20px_-10px_rgba(255,77,141,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Book Your Appointment
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
