"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] w-full bg-[#FFF5F8] overflow-hidden flex items-center pt-20">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#FFF5F8] to-transparent z-10" />
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-pink-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-white rounded-full blur-3xl opacity-80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 lg:px-16 w-full flex flex-col lg:flex-row items-center justify-between gap-16 py-12 lg:py-0">
        
        {/* Left Column: Text */}
        <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left pt-12 lg:pt-0">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-pink-100 mb-8"
          >
            <Star className="text-[#FF4D8D]" size={14} fill="currentColor" />
            <span className="text-xs font-black text-[#FF4D8D] tracking-widest uppercase">Luxury Nail & Esthetic Studio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-black text-gray-900 tracking-tight leading-[1.1] mb-6"
          >
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D8D] to-[#ff85ad]">Beauty Routine.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-xl mb-10"
          >
            Experience the pinnacle of luxury nail care. Meticulous attention to detail, premium products, and stunning results that speak for themselves.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/booking"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#FF4D8D] hover:bg-[#ff337a] text-white rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-xl shadow-pink-500/20 group"
            >
              Book Appointment
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/services"
              className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 shadow-sm border border-gray-200 rounded-full font-bold text-lg transition-colors"
            >
              View Services
            </Link>
          </motion.div>

        </div>

        {/* Right Column: Image */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end relative pb-12 lg:pb-0"
        >
          {/* Main Image Container */}
          <div className="relative w-full max-w-[400px] lg:max-w-[450px] aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl shadow-pink-900/10">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat mix-blend-multiply"
              style={{
                backgroundImage: "url('/images/hero-nails.png')"
              }}
            />
            {/* Gradient Overlay for blending */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF5F8]/40 to-transparent mix-blend-overlay" />
          </div>
          
          {/* Floating Element */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl shadow-pink-900/5 border border-pink-50 max-w-[200px]"
          >
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="text-yellow-400" size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm font-bold text-gray-900">Rated 5.0 by our lovely clients</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
