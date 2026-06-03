"use client";

import { motion } from "framer-motion";
import { Award, Users, CalendarCheck, Sparkles } from "lucide-react";

const metrics = [
  { label: "Licensed Professional", value: "100%", icon: Award },
  { label: "Satisfied Clients", value: "500+", icon: Users },
  { label: "Years Experience", value: "5+", icon: Sparkles },
  { label: "Appointments Completed", value: "2K+", icon: CalendarCheck },
];

export const TrustMetrics = () => {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-pink-50 flex items-center justify-center text-[#FF4D8D]">
                  <Icon size={32} strokeWidth={2} />
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                    {metric.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
