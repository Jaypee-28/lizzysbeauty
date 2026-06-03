import { prisma } from "@/lib/db";
import { FaqClient } from "@/components/faqs/faq-client";
import { BookingCta } from "@/components/home/booking-cta";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Frequently Asked Questions | Lizzy's Beauty Studio",
};

export default async function FaqsPage() {
  const faqs = await prisma.fAQ.findMany({
    where: { isActive: true },
    orderBy: { category: "asc" },
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            Frequently Asked <span className="text-[#FF4D8D]">Questions</span>
          </h1>
          <p className="text-lg text-gray-500 font-medium leading-relaxed">
            Everything you need to know about our services, booking policies, and what to expect during your visit.
          </p>
        </div>

        <FaqClient faqs={faqs} />
      </div>

      <BookingCta />
    </div>
  );
}
