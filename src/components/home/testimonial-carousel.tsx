"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Regular Client",
    content: "Lizzy's Beauty Studio completely transformed my nail care routine. The attention to detail is unmatched, and my gel manicures last longer than ever before.",
  },
  {
    name: "Emily Rodriguez",
    role: "Bride-to-be",
    content: "I booked Lizzy for my bridal party and the experience was incredible. We felt so pampered, and our nails looked flawless for the wedding photos.",
  },
  {
    name: "Jessica Chen",
    role: "Local Professional",
    content: "The most relaxing, hygienic, and premium salon experience I've had in the city. The staff is so welcoming and talented.",
  },
];

export const TestimonialCarousel = () => {
  return (
    <section className="py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight"
          >
            Client Love
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 relative group hover:shadow-xl transition-shadow"
            >
              <div className="absolute top-8 right-8 text-[#FF4D8D]/20 group-hover:text-[#FF4D8D]/40 transition-colors">
                <Quote size={48} />
              </div>
              
              <p className="text-gray-600 font-medium leading-relaxed mb-8 relative z-10 text-lg">
                "{t.content}"
              </p>
              
              <div className="mt-auto">
                <h4 className="font-bold text-gray-900">{t.name}</h4>
                <p className="text-sm text-gray-400 font-medium">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
