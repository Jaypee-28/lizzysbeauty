"use client";

import Link from "next/link";
import { Camera, Globe, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-tighter text-gray-900">
                LIZZY&apos;S<span className="text-[#FF4D8D]">.</span>
              </span>
            </Link>
            <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
              Experience the pinnacle of luxury nail care and esthetic services. Premium quality, exceptional attention to detail.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#FF4D8D] hover:text-white transition-colors">
                <Camera size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#FF4D8D] hover:text-white transition-colors">
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {["Home", "About Us", "Gallery", "FAQ", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "-")}`} className="text-gray-500 hover:text-[#FF4D8D] font-medium transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500">
                <MapPin size={20} className="shrink-0 text-[#FF4D8D]" />
                <span className="font-medium leading-relaxed">18620 Reliant Dr<br/>Gaithersburg, MD 20879</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Phone size={20} className="shrink-0 text-[#FF4D8D]" />
                <span className="font-medium">+1 301-250-0602</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Mail size={20} className="shrink-0 text-[#FF4D8D]" />
                <span className="font-medium">hello@lizzysbeauty.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Newsletter</h3>
            <p className="text-gray-500 font-medium mb-4 leading-relaxed">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-gray-50 rounded-xl px-4 py-3.5 text-sm font-medium border-none focus:ring-2 focus:ring-[#FF4D8D] outline-none transition-all pr-12"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white hover:bg-[#FF4D8D] transition-colors"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-gray-400">
            © {new Date().getFullYear()} Lizzy&apos;s Beauty Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
