"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Service } from "@/generated/prisma";

export const FeaturedServices = ({ services }: { services: Service[] }) => {
  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-black text-[#FF4D8D] uppercase tracking-[0.2em] mb-4"
            >
              Our Offerings
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight"
            >
              Signature Treatments
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-bold text-gray-900 hover:text-[#FF4D8D] transition-colors"
            >
              View All Services <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={service.imageUrl || "https://res.cloudinary.com/dwnxhwayq/image/upload/v1724036815/placeholder.jpg"}
                  alt={service.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                
                {/* Price Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="font-black text-gray-900">${Number(service.fullPrice).toFixed(0)}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight">
                  {service.name}
                </h3>
                
                <div className="flex items-center gap-2 text-gray-400 text-sm font-semibold mb-4">
                  <Clock size={16} />
                  {service.duration} Mins
                </div>

                <p className="text-gray-500 font-medium leading-relaxed mb-8 line-clamp-2 flex-1">
                  {service.description}
                </p>

                <Link
                  href={`/booking?service=${service.id}`}
                  className="mt-auto w-full inline-flex items-center justify-center gap-2 py-4 bg-gray-50 text-gray-900 font-bold rounded-xl hover:bg-black hover:text-white transition-all duration-300 group/btn"
                >
                  Book Now
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
