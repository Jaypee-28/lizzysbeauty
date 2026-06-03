"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Search } from "lucide-react";
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

        {/* Gallery-style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              className="relative group rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(255,77,141,0.4)] hover:-translate-y-2 transition-all duration-500 cursor-pointer border-[4px] sm:border-[6px] border-white bg-white"
            >
              <div className="relative w-full aspect-[4/5] rounded-2xl sm:rounded-[1.5rem] overflow-hidden">
                <Image
                  src={img.url}
                  alt={img.caption || "Gallery"}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
