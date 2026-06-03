import { Metadata } from "next";
import { Suspense } from "react";
import { serviceService } from "@/modules/services/service.service";
import { BookingForm } from "@/components/booking/booking-form";
import { prisma } from "@/lib/db";
import { sanitizeData } from "@/lib/utils";
export const metadata: Metadata = {
  title: "Book Appointment | Lizzy's Beauty Studio",
  description: "Schedule your premium hair service appointment.",
};

export default async function BookingPage() {
  const rawServices = await serviceService.getAllServices();
  const services = sanitizeData(rawServices) as any;
  const settings = await prisma.setting.findFirst();
  const bookingPolicy = settings?.bookingPolicy || "By booking this service, you agree to our terms and conditions. A deposit is required to secure your slot.";

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-outfit text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
            Book an Appointment
          </h1>
          <p className="mt-4 text-gray-500 font-medium text-lg max-w-2xl mx-auto">
            Experience premium luxury hair and beauty services. Follow the steps below to secure your slot.
          </p>
        </div>
        
        <Suspense fallback={<div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div>}>
          <BookingForm services={services} bookingPolicy={bookingPolicy} />
        </Suspense>
      </div>
    </div>
  );
}
