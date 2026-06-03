"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import { GalleryImage } from "@/generated/prisma";

export const PortfolioPreview = ({ images }: { images: GalleryImage[] }) => {
  if (images.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-sm font-black text-[#FF4D8D] uppercase tracking-[0.2em] mb-4"
          >
            <Camera size={16} />
            Follow Our Work
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight max-w-2xl"
          >
            A Glimpse of Perfection
          </motion.h2>
        </div>

        {/* Dynamic Masonry-ish Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              className="relative group rounded-2xl overflow-hidden break-inside-avoid shadow-sm hover:shadow-xl transition-all"
            >
              {/* Force an aspect ratio but let it be naturally sized. For simplicity, we use an image tag that maintains natural aspect ratio. */}
              <div className="relative w-full">
                <Image
                  src={img.url}
                  alt={img.caption || "Gallery"}
                  width={500}
                  height={500}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                {img.caption && (
                  <p className="text-white font-bold text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {img.caption}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-[#FF4D8D] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300"
          >
            View Full Gallery <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
