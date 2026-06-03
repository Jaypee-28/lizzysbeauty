"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Heart, Coffee, Star } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Licensed Professionals",
    description: "Our staff is fully licensed, highly trained, and continually educated on the latest techniques and hygiene protocols.",
  },
  {
    icon: Sparkles,
    title: "Premium Products",
    description: "We exclusively use top-tier, luxury brands and non-toxic products that ensure long-lasting, healthy results.",
  },
  {
    icon: Heart,
    title: "Attention to Detail",
    description: "Perfection is our baseline. Every cuticle, polish coat, and treatment is executed with meticulous care.",
  },
  {
    icon: Coffee,
    title: "Relaxing Experience",
    description: "From the moment you walk in, enjoy complimentary beverages, a serene atmosphere, and VIP treatment.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-[#111] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-bold tracking-widest uppercase mb-6 text-[#FF4D8D]"
          >
            <Star size={14} fill="currentColor" />
            The Lizzy&apos;s Difference
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight leading-tight"
          >
            Why Our Clients <br className="hidden md:block" />
            Keep Coming Back
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="w-14 h-14 bg-[#FF4D8D] rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-pink-500/20">
                  <Icon size={24} strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
