"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";

type ServiceData = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string | null;
  [key: string]: any;
};

interface ServicesClientProps {
  services: ServiceData[];
}

export function ServicesClient({ services }: ServicesClientProps) {
  return (
    <main className="bg-white min-h-screen">
      {/* 1. HERO SECTION (LUXURY MINIMAL) */}
      <section className="bg-gradient-to-b from-[#FFF1F6] to-white pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-pink-500 font-semibold block mb-4">
            SERVICES
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Luxury Beauty Services
          </h1>
          <p className="text-gray-600 mt-4 md:text-lg">
            From premium hair installations to flawless glam, we bring your beauty vision to life with expert care.
          </p>
        </div>
      </section>

      {/* 2. SERVICES GRID (CORE SECTION) */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 font-medium">No services available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                    <span className="font-black text-gray-900">${Number(service.fullPrice || 0).toFixed(0)}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight">
                    {service.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-gray-400 text-sm font-semibold mb-4">
                    <Clock size={16} />
                    {service.duration || 60} Mins
                  </div>

                  <p className="text-gray-500 font-medium leading-relaxed mb-8 line-clamp-2 flex-1">
                    {service.description}
                  </p>

                  <Link
                    href={`/booking?serviceId=${service.id}`}
                    className="mt-auto w-full inline-flex items-center justify-center gap-2 py-4 bg-gray-50 text-gray-900 font-bold rounded-xl hover:bg-black hover:text-white transition-all duration-300 group/btn"
                  >
                    Book Now
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 3. CTA BANNER (BOOKING PUSH) */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="bg-pink-500 rounded-2xl py-16 px-6 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Elevate Your Look?
          </h2>
          <p className="text-pink-50 mb-8 max-w-2xl mx-auto md:text-lg">
            Book your appointment today and experience premium beauty services tailored just for you.
          </p>
          <Link
            href="/booking"
            className="inline-block bg-white text-pink-500 font-semibold hover:bg-gray-100 rounded-full px-6 py-3 transition-colors duration-300"
          >
            Book Appointment
          </Link>
        </div>
      </section>
    </main>
  );
}
