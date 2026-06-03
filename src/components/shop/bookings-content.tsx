"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Calendar,
  Sparkles,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ────────────────────────────────────────────────────────────────────

interface Service {
  id: string;
  name: string;
  imageUrl?: string | null;
}

interface Booking {
  id: string;
  status: string;
  fullPrice: any; // Prisma.Decimal
  depositPaid: any;
  outstandingBalance: any;
  preferredDate: Date;
  preferredTime: string;
  createdAt: Date;
  service: Service;
}

interface BookingsContentProps {
  bookings: Booking[];
}

// ── Status Helpers ───────────────────────────────────────────────────────────

const BOOKING_STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  PENDING: {
    label: "Pending",
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
    icon: <AlertCircle size={12} strokeWidth={3} />,
  },
  PENDING_PAYMENT: {
    label: "Pending Payment",
    color: "text-purple-700",
    bg: "bg-purple-50 border-purple-200",
    icon: <AlertCircle size={12} strokeWidth={3} />,
  },
  CONFIRMED: {
    label: "Confirmed",
    color: "text-emerald-700",
    bg: "bg-emerald-50 border-emerald-200",
    icon: <CheckCircle2 size={12} strokeWidth={3} />,
  },
  COMPLETED: {
    label: "Completed",
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
    icon: <Sparkles size={12} strokeWidth={3} />,
  },
  CANCELLED: {
    label: "Cancelled",
    color: "text-red-700",
    bg: "bg-red-50 border-red-200",
    icon: <XCircle size={12} strokeWidth={3} />,
  },
};

function StatusBadge({
  config,
  icon,
}: {
  config: { label: string; color: string; bg: string };
  icon?: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
        config.bg,
        config.color
      )}
    >
      {icon}
      {config.label}
    </span>
  );
}

// ── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="w-24 h-24 bg-pink-50 rounded-[2rem] flex items-center justify-center mb-8">
        <Calendar size={40} className="text-[#FF4D8D]" strokeWidth={1.5} />
      </div>
      <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-3">
        No Bookings Yet
      </h2>
      <p className="text-gray-500 font-medium mb-8 max-w-md">
        You haven&apos;t booked any appointments yet. Explore our premium hair and beauty services.
      </p>
      <Link
        href="/services"
        className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#FF4D8D] transition-all duration-300 shadow-xl shadow-gray-200 hover:shadow-pink-200"
      >
        <Calendar size={18} />
        Book an Appointment
        <ArrowRight size={16} strokeWidth={3} />
      </Link>
    </div>
  );
}

// ── Desktop Table Row ────────────────────────────────────────────────────────

function BookingTableRow({ booking }: { booking: Booking }) {
  const statusConfig = BOOKING_STATUS_CONFIG[booking.status] ?? BOOKING_STATUS_CONFIG.PENDING;

  return (
    <tr className="group hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-5">
        <span className="text-sm font-black text-gray-900 uppercase tracking-wider">
          #{booking.id.slice(-8)}
        </span>
      </td>
      <td className="px-6 py-5">
        <span className="text-sm font-black text-gray-900">
          {booking.service.name}
        </span>
      </td>
      <td className="px-6 py-5">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900">
            {format(new Date(booking.preferredDate), "dd MMM yyyy")}
          </span>
          <span className="text-xs font-bold text-gray-500">
            at {booking.preferredTime}
          </span>
        </div>
      </td>
      <td className="px-6 py-5">
        <div className="flex flex-col">
          <span className="text-sm font-black text-gray-900">
            ${Number(booking.fullPrice).toFixed(2)}
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
            Bal: ${Number(booking.outstandingBalance).toFixed(2)}
          </span>
        </div>
      </td>
      <td className="px-6 py-5">
        <StatusBadge config={statusConfig} icon={statusConfig.icon} />
      </td>
    </tr>
  );
}

// ── Mobile Card ──────────────────────────────────────────────────────────────

function BookingCard({ booking }: { booking: Booking }) {
  const statusConfig = BOOKING_STATUS_CONFIG[booking.status] ?? BOOKING_STATUS_CONFIG.PENDING;

  return (
    <div className="block bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:border-pink-100 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Booking
          </span>
          <p className="text-sm font-black text-gray-900 uppercase tracking-wider">
            #{booking.id.slice(-8)}
          </p>
        </div>
        <StatusBadge config={statusConfig} icon={statusConfig.icon} />
      </div>

      <div className="mb-4">
         <p className="text-sm font-black text-[#FF4D8D]">{booking.service.name}</p>
      </div>

      {/* Date & Time */}
      <div className="flex items-center justify-between mb-5 pb-5 border-b border-gray-50">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-500">
            {format(new Date(booking.preferredDate), "dd MMM yyyy")}
          </span>
          <span className="text-xs font-black text-gray-900 mt-0.5">
            {booking.preferredTime}
          </span>
        </div>
        <div className="text-right">
          <span className="block text-lg font-black text-gray-900">
            ${Number(booking.fullPrice).toFixed(2)}
          </span>
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
            Bal: ${Number(booking.outstandingBalance).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export function BookingsContent({ bookings }: BookingsContentProps) {
  if (bookings.length === 0) {
    return (
      <div className="min-h-screen bg-[#FBFCFD] pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
          {/* Header */}
          <div className="space-y-1 mb-16">
            <div className="flex items-center gap-2 text-[#FF4D8D]">
              <Sparkles size={14} strokeWidth={3} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                My Bookings
              </span>
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">
              YOUR <span className="text-[#FF4D8D]">APPOINTMENTS</span>
            </h1>
          </div>
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFCFD] pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#FF4D8D]">
              <Sparkles size={14} strokeWidth={3} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                My Bookings
              </span>
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">
              YOUR <span className="text-[#FF4D8D]">APPOINTMENTS</span>
            </h1>
          </div>
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
            {bookings.length} {bookings.length === 1 ? "APPOINTMENT" : "APPOINTMENTS"}
          </span>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Booking ID
                </th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Service
                </th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Date & Time
                </th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Price
                </th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {bookings.map((booking) => (
                <BookingTableRow key={booking.id} booking={booking} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </div>
  );
}
