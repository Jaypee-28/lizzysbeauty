import Image from "next/image";
import { Testimonials } from "@/components/home/testimonials";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { BookingCta } from "@/components/home/booking-cta";

export const metadata = {
  title: "About Us | Lizzy's Beauty Studio",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            Elevating Your Natural <span className="text-[#FF4D8D]">Beauty</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
            Lizzy&apos;s Beauty Studio is a premier destination for luxury nail care and esthetic treatments, designed to provide a serene, premium experience tailored to your unique style.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-100 shadow-xl">
              <Image 
                src="/images/about-hero.jpg" 
                alt="Lizzy working on a client" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 rounded-full bg-pink-50 text-[#FF4D8D] text-sm font-bold tracking-widest uppercase">
                Our Story
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                Passion Meets Precision
              </h2>
              <div className="space-y-6 text-gray-500 font-medium text-lg leading-relaxed">
                <p>
                  Founded by Lizzy, a passionate and licensed esthetician, our studio was born out of a desire to create a space where beauty and relaxation intersect. We believe that self-care is not a luxury, but a necessity.
                </p>
                <p>
                  Every treatment is personalized. Whether you are looking for a flawless gel manicure, intricate nail art, or a rejuvenating esthetic treatment, our team ensures that you leave feeling confident and pampered.
                </p>
                <p>
                  We prioritize health and hygiene, using only premium, non-toxic products and hospital-grade sterilization techniques to ensure the highest standards of safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      
      <Testimonials />
      
      <BookingCta />
    </div>
  );
}
