"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Settings,
  Loader2,
  Save,
  Store,
  Mail,
  Truck,
  Video,
  Type,
  Plus,
  X,
  GripVertical,
  Sparkles,
  Coins,
} from "lucide-react";
import { VideoUpload } from "@/components/ui/video-upload";

// ── Types ─────────────────────────────────────────────────────────────────────

interface SettingsData {
  id: string;
  storeName: string | null;
  supportEmail: string | null;
  // Hero
  heroVideoUrl: string | null;
  heroTopLabel: string | null;
  heroTitle: string | null;
  heroWords: string[] | null;
  heroSubtitle: string | null;
  heroPrimaryCTA: string | null;
  heroSecondaryCTA: string | null;
  currency: string;
  bookingPolicy: string | null;
}

// ── Shared input style ────────────────────────────────────────────────────────

const INPUT =
  "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4D8D] focus:border-transparent transition-all placeholder:text-gray-300";

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Store / Delivery
  const [storeName, setStoreName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");


  const [currency, setCurrency] = useState("USD");
  
  // Booking Policy
  const [bookingPolicy, setBookingPolicy] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  // ── Fetch ───────────────────────────────────────────────────────────────────

  async function fetchSettings() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/settings");
      if (!res.ok) throw new Error("Failed to fetch settings");
      const data: SettingsData = await res.json();
      setSettings(data);

      // Store
      setStoreName(data.storeName || "");
      setSupportEmail(data.supportEmail || "");


    } catch {
      toast.error("Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  }



  // ── Save ────────────────────────────────────────────────────────────────────

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Store
          storeName: storeName || undefined,
          supportEmail: supportEmail || undefined,

          currency: currency || undefined,
          bookingPolicy: bookingPolicy || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update settings");
      }

      const updated: SettingsData = await res.json();
      setSettings(updated);
      toast.success("Settings saved successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  }

  // ── Loading state ───────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-gray-400">
          <Loader2 size={24} className="animate-spin" />
          <p className="font-bold">Loading settings...</p>
        </div>
      </div>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8 max-w-[800px]">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Settings
        </h1>
        <p className="text-gray-500 font-semibold mt-1">
          Configure store information, delivery fees, and the homepage hero.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* ── Store Information ─────────────────────────────────────────── */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 bg-gray-50/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-pink-50 rounded-xl flex items-center justify-center text-[#FF4D8D] border border-pink-100 shadow-sm">
                <Store size={18} strokeWidth={2.5} />
              </div>
              <h2 className="text-lg font-black text-gray-900 tracking-tight">
                Store Information
              </h2>
            </div>
          </div>
          <div className="p-6 space-y-5 min-w-0">
            <div className="min-w-0">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Lizzy's Beauty Studio"
                className={`${INPUT} min-w-0`}
              />
            </div>
            <div className="min-w-0">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                <div className="flex items-center gap-1.5">
                  <Mail size={12} strokeWidth={2.5} />
                  Support Email
                </div>
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                placeholder="hello@lizzysbeautystudio.com"
                className={`${INPUT} min-w-0`}
              />
            </div>
          </div>
        </div>

      {/* ── Currency & Localization ─────────────────────────────────── */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 border border-amber-100 shadow-sm">
              <Coins size={18} strokeWidth={2.5} />
            </div>
            <h2 className="text-lg font-black text-gray-900 tracking-tight">
              Currency & Localization
            </h2>
          </div>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
              Store Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className={INPUT}
            >
              <option value="USD">USD ($) - British Pound</option>
              <option value="USD">USD ($) - US Dollar</option>
              <option value="EUR">EUR (€) - Euro</option>
              <option value="NGN">NGN (₦) - Nigerian Naira</option>
              <option value="CAD">CAD ($) - Canadian Dollar</option>
              <option value="XAF">XAF (FCFA) - Central African CFA Franc</option>
            </select>
            <p className="text-xs text-gray-400 mt-1.5 font-medium">
              This will update the currency symbol displayed across the entire store.
            </p>
          </div>
        </div>
      </div>



        {/* ── Booking Policy ────────────────────────────────────────────── */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 bg-gray-50/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-pink-50 rounded-xl flex items-center justify-center text-[#FF4D8D] border border-pink-100 shadow-sm">
                <Sparkles size={18} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-lg font-black text-gray-900 tracking-tight">
                  Booking Policy
                </h2>
                <p className="text-[11px] font-semibold text-gray-400 mt-0.5">
                  Displayed to customers before they complete a service booking.
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <textarea
              value={bookingPolicy}
              onChange={(e) => setBookingPolicy(e.target.value)}
              placeholder="Enter your booking policy here..."
              rows={8}
              className={`${INPUT} resize-y min-w-0`}
            />
          </div>
        </div>

        {/* ── Save Button ───────────────────────────────────────────────── */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#FF4D8D] text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-[#E6457E] transition-all shadow-lg shadow-pink-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} strokeWidth={2.5} />
            )}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
