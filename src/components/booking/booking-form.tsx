"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { bookingSchema, BookingInput, TIME_SLOTS } from "@/modules/bookings/booking.schema";
import { Service } from "@/generated/prisma";
import { BookingCalendar } from "./booking-calendar";
import { format } from "date-fns";
import Image from "next/image";
import { Calendar, Clock, CreditCard, Sparkles, CheckCircle2 } from "lucide-react";

interface BookingFormProps {
  services: Service[];
  bookingPolicy: string;
}

export const BookingForm = ({ services, bookingPolicy }: BookingFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceIdParam = searchParams.get("serviceId");
  const canceled = searchParams.get("canceled");

  useEffect(() => {
    if (canceled) {
      toast.error("Payment was canceled. You can try again.");
    }
  }, [canceled]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availabilityMap, setAvailabilityMap] = useState<Record<string, string[]>>({});
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema) as any,
    defaultValues: {
      serviceId: serviceIdParam || "",
      preferredDate: undefined,
      preferredTime: undefined,
    },
  });

  const selectedServiceId = watch("serviceId");
  const selectedDate = watch("preferredDate");
  const selectedTime = watch("preferredTime");

  const selectedService = services.find((s) => s.id === selectedServiceId);

  const fetchAvailability = async (month: Date) => {
    setIsLoadingAvailability(true);
    try {
      const monthParam = month.getMonth() + 1; // 1-12
      const yearParam = month.getFullYear();
      const res = await fetch(`/api/bookings/availability?month=${monthParam}&year=${yearParam}`);
      if (res.ok) {
        const data = await res.json();
        setAvailabilityMap(data);
      }
    } catch (error) {
      console.error("Failed to fetch availability", error);
    } finally {
      setIsLoadingAvailability(false);
    }
  };

  useEffect(() => {
    fetchAvailability(currentMonth);
  }, [currentMonth]);

  const onSubmit = async (data: BookingInput) => {
    if (!policyAccepted) {
      toast.error("Please accept the booking policy to proceed.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Changed to checkout route
      const response = await fetch("/api/bookings/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || error.message || "Failed to initiate booking");
      }

      const result = await response.json();
      
      if (result.url) {
        // Redirect to Stripe Checkout or success page if no deposit
        window.location.href = result.url;
      } else {
        toast.success("Booking submitted successfully!");
        router.push("/booking/success");
      }
    } catch (error: any) {
      toast.error(error.message);
      setIsSubmitting(false);
    }
  };

  const getAvailableSlotsForSelectedDate = () => {
    if (!selectedDate) return [];
    const dateObj = new Date(selectedDate);
    const dateStr = format(dateObj, "yyyy-MM-dd");
    return availabilityMap[dateStr] || [...TIME_SLOTS];
  };

  const availableSlots = getAvailableSlotsForSelectedDate();

  const fullPrice = selectedService ? Number(selectedService.fullPrice || 0) : 0;
  const depositPercentage = selectedService ? selectedService.depositPercentage : 0;
  const depositAmount = (fullPrice * depositPercentage) / 100;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
      {/* Left Column: Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:w-[60%] space-y-12">
        
        {/* Step 1: Select Service */}
        <section className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#FF4D8D]/10 text-[#FF4D8D] flex items-center justify-center font-bold">1</div>
            <h2 className="text-xl font-black text-gray-900">Select Service</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service) => {
              const isSelected = selectedServiceId === service.id;
              return (
                <div 
                  key={service.id}
                  onClick={() => setValue("serviceId", service.id, { shouldValidate: true })}
                  className={`relative cursor-pointer rounded-2xl border-2 p-4 transition-all ${isSelected ? 'border-[#FF4D8D] bg-pink-50/30' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4 text-[#FF4D8D]">
                      <CheckCircle2 className="w-5 h-5 fill-current text-white" />
                    </div>
                  )}
                  <h3 className="font-bold text-gray-900 pr-8">{service.name}</h3>
                  <div className="mt-2 flex items-center gap-3 text-sm font-medium text-gray-500">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {service.duration}m</span>
                    <span>•</span>
                    <span>${Number(service.fullPrice || 0).toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {errors.serviceId && <p className="mt-2 text-sm text-red-600 font-medium">{errors.serviceId.message}</p>}
        </section>

        {/* Step 2: Date & Time */}
        <section className={`bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-opacity duration-300 ${!selectedService ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#FF4D8D]/10 text-[#FF4D8D] flex items-center justify-center font-bold">2</div>
            <h2 className="text-xl font-black text-gray-900">Date & Time</h2>
          </div>
          
          <div className="flex flex-col xl:flex-row gap-8">
            <div className="flex-1">
              <Controller
                control={control}
                name="preferredDate"
                render={({ field }) => (
                  <BookingCalendar
                    selectedDate={field.value ? new Date(field.value) : undefined}
                    onSelectDate={(date) => {
                      field.onChange(date);
                      setValue("preferredTime", "" as any);
                    }}
                    currentMonth={currentMonth}
                    onMonthChange={setCurrentMonth}
                    availabilityMap={availabilityMap}
                  />
                )}
              />
              {errors.preferredDate && <p className="mt-2 text-sm text-red-600 font-medium text-center">{errors.preferredDate.message}</p>}
            </div>

            <div className="flex-1 flex flex-col">
              <h3 className="text-sm font-bold text-gray-900 mb-4 bg-gray-50 p-3 rounded-xl text-center border border-gray-100">
                {selectedDate ? format(new Date(selectedDate), "EEEE, MMMM do") : "Select a date first"}
              </h3>
              
              {isLoadingAvailability ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#FF4D8D]"></div>
                </div>
              ) : selectedDate ? (
                availableSlots.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {TIME_SLOTS.map((slot) => {
                      const isAvailable = availableSlots.includes(slot);
                      const isSelected = selectedTime === slot;
                      
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={!isAvailable}
                          onClick={() => setValue("preferredTime", slot as any, { shouldValidate: true })}
                          className={`
                            py-3 px-4 rounded-xl text-sm font-bold transition-all border
                            ${isSelected 
                              ? "bg-black text-white border-black shadow-md" 
                              : isAvailable 
                                ? "bg-white border-gray-200 text-gray-700 hover:border-black hover:text-black" 
                                : "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"}
                          `}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-6 bg-red-50 rounded-xl border border-red-100 text-center">
                    <p className="text-red-800 font-bold mb-1">Fully Booked</p>
                    <p className="text-red-600 text-sm font-medium">No available slots for this date.</p>
                  </div>
                )
              ) : (
                <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 rounded-xl border border-gray-100 text-center border-dashed">
                  <p className="text-gray-400 text-sm font-medium">Time slots will appear here after you select a date.</p>
                </div>
              )}
              {errors.preferredTime && <p className="mt-2 text-sm text-red-600 font-medium text-center">{errors.preferredTime.message}</p>}
            </div>
          </div>
        </section>

        {/* Step 3: Personal Details */}
        <section className={`bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-opacity duration-300 ${(!selectedDate || !selectedTime) ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#FF4D8D]/10 text-[#FF4D8D] flex items-center justify-center font-bold">3</div>
            <h2 className="text-xl font-black text-gray-900">Your Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input
                {...register("name")}
                type="text"
                placeholder="Jane Doe"
                className="w-full rounded-xl border-gray-200 bg-gray-50/50 py-3 px-4 text-sm font-medium focus:ring-[#FF4D8D] focus:border-[#FF4D8D] transition-colors"
              />
              {errors.name && <p className="mt-2 text-sm text-red-600 font-medium">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="jane@example.com"
                className="w-full rounded-xl border-gray-200 bg-gray-50/50 py-3 px-4 text-sm font-medium focus:ring-[#FF4D8D] focus:border-[#FF4D8D] transition-colors"
              />
              {errors.email && <p className="mt-2 text-sm text-red-600 font-medium">{errors.email.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
              <input
                {...register("phone")}
                type="tel"
                placeholder="+44 7700 900000"
                className="w-full rounded-xl border-gray-200 bg-gray-50/50 py-3 px-4 text-sm font-medium focus:ring-[#FF4D8D] focus:border-[#FF4D8D] transition-colors"
              />
              {errors.phone && <p className="mt-2 text-sm text-red-600 font-medium">{errors.phone.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Notes (Optional)</label>
              <textarea
                {...register("notes")}
                rows={3}
                placeholder="Any special requests or details we should know?"
                className="w-full rounded-xl border-gray-200 bg-gray-50/50 py-3 px-4 text-sm font-medium focus:ring-[#FF4D8D] focus:border-[#FF4D8D] transition-colors resize-none"
              ></textarea>
            </div>
          </div>
        </section>

        {/* Step 4: Policy */}
        <section className={`bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-opacity duration-300 ${(!selectedDate || !selectedTime) ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#FF4D8D]/10 text-[#FF4D8D] flex items-center justify-center font-bold">4</div>
            <h2 className="text-xl font-black text-gray-900">Booking Policy</h2>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 mb-6 max-h-40 overflow-y-auto">
            <p className="text-sm text-gray-600 font-medium whitespace-pre-wrap">{bookingPolicy}</p>
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="checkbox"
                checked={policyAccepted}
                onChange={(e) => setPolicyAccepted(e.target.checked)}
                className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:ring-[#FF4D8D] focus:ring-offset-2 checked:bg-[#FF4D8D] checked:border-[#FF4D8D] transition-all cursor-pointer"
              />
              <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" strokeWidth={4} />
            </div>
            <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">
              I have read and agree to the booking policy and terms.
            </span>
          </label>
        </section>

        {/* Mobile Submit Button (Hidden on Desktop) */}
        <div className="lg:hidden">
          <button
            type="submit"
            disabled={isSubmitting || !selectedService || !selectedDate || !selectedTime || !policyAccepted}
            className="w-full inline-flex items-center justify-center rounded-2xl bg-black px-6 py-4 text-base font-black text-white transition-all hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-black/10 gap-2"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <CreditCard className="w-5 h-5" /> Pay Deposit to Book
              </>
            )}
          </button>
        </div>
      </form>

      {/* Right Column: Sticky Summary */}
      <div className="w-full lg:w-[40%] sticky top-24">
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40">
          <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
            Summary <Sparkles className="w-5 h-5 text-[#FF4D8D]" />
          </h2>

          <div className="space-y-6">
            {/* Service details */}
            <div className="flex gap-4 items-start">
              <div className="w-16 h-16 rounded-2xl bg-pink-50 border border-pink-100 flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                {selectedService?.imageUrl ? (
                  <Image src={selectedService.imageUrl} alt={selectedService.name} fill className="object-cover" />
                ) : (
                  <Sparkles className="w-6 h-6 text-[#FF4D8D]" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight">
                  {selectedService ? selectedService.name : "No service selected"}
                </h3>
                {selectedService && (
                  <p className="text-sm font-medium text-gray-500 mt-1">{selectedService.duration} minutes</p>
                )}
              </div>
            </div>

            <div className="h-px bg-gray-100 w-full" />

            {/* Date & Time */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-500 flex items-center gap-2"><Calendar className="w-4 h-4" /> Date</span>
                <span className="text-sm font-black text-gray-900">
                  {selectedDate ? format(new Date(selectedDate), "MMM do, yyyy") : "—"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Time</span>
                <span className="text-sm font-black text-gray-900">
                  {selectedTime || "—"}
                </span>
              </div>
            </div>

            <div className="h-px bg-gray-100 border-dashed border-b border-gray-200 w-full" />

            {/* Pricing */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-500">Full Price</span>
                <span className="text-sm font-black text-gray-900">${fullPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-[#FF4D8D]">Deposit Required ({depositPercentage}%)</span>
                <span className="text-sm font-black text-[#FF4D8D]">${depositAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mt-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-base font-black text-gray-900">Due Today</span>
                <span className="text-2xl font-black text-gray-900">${depositAmount.toFixed(2)}</span>
              </div>
              <p className="text-xs font-medium text-gray-500 text-right">
                Remaining ${(fullPrice - depositAmount).toFixed(2)} to be paid at salon.
              </p>
            </div>

            {/* Desktop Submit Button */}
            <div className="hidden lg:block mt-6">
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting || !selectedService || !selectedDate || !selectedTime || !policyAccepted}
                className="w-full inline-flex items-center justify-center rounded-2xl bg-black px-6 py-4 text-base font-black text-white transition-all hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-black/10 gap-2"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" /> Pay Deposit to Book
                  </>
                )}
              </button>
            </div>
            
            <p className="text-[11px] font-bold text-gray-400 text-center uppercase tracking-wider mt-4">
              Secure payment powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
