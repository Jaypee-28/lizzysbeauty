"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, UserCircle } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faqs" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const isHome = pathname === "/";
  const navBackground = isScrolled || !isHome ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm" : "bg-transparent";
  const textColor = "text-gray-900";
  const logoColor = "text-black";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-500",
          navBackground
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 z-50 relative">
            <Sparkles className="transition-colors duration-300 text-[#FF4D8D]" size={24} />
            <span className={cn("text-2xl font-black tracking-tighter transition-colors duration-300", logoColor)}>
              LIZZY&apos;S<span className="text-[#FF4D8D]">.</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-bold tracking-wide transition-colors relative group py-2",
                    isActive ? "text-[#FF4D8D]" : textColor,
                    !isActive && "hover:opacity-70"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#FF4D8D]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 z-50 relative">
            {/* User Dropdown (Desktop Only) */}
            <div
              className="relative hidden lg:block"
              onMouseEnter={() => setIsUserMenuOpen(true)}
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <button
                className={cn(
                  "p-2 rounded-full transition-colors flex items-center justify-center",
                  textColor,
                  "hover:bg-black/5"
                )}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                {session?.user?.image ? (
                  <img src={session.user.image} alt={session.user.name || "User"} className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <UserCircle size={24} />
                )}
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 z-50"
                  >
                    {session ? (
                      <>
                        <div className="px-4 py-2 border-b border-gray-100 mb-2">
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {session.user?.name || session.user?.email || "My Account"}
                          </p>
                        </div>
                        <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#FF4D8D] transition-colors">
                          Profile Settings
                        </Link>
                        <Link href="/bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#FF4D8D] transition-colors">
                          My Bookings
                        </Link>
                        <button
                          onClick={() => signOut()}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors mt-2 border-t border-gray-50 pt-2"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" className="block px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                          Login
                        </Link>
                        <Link href="/register" className="block px-4 py-2 text-sm font-semibold text-[#FF4D8D] hover:bg-gray-50 transition-colors">
                          Register
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/booking"
              className="hidden md:flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 bg-black text-white shadow-lg shadow-black/10 hover:bg-gray-800"
            >
              Book Appointment
            </Link>

            <button
              className={cn("lg:hidden p-2 rounded-full transition-colors", textColor, isMobileMenuOpen && "!text-black")}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.div animate={isMobileMenuOpen ? "open" : "closed"}>
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white z-40 lg:hidden shadow-2xl flex flex-col"
            >
              <div className="flex-1 overflow-y-auto pt-28 pb-8 px-8 flex flex-col gap-8">
                <nav className="flex flex-col gap-6">
                  {links.map((link, i) => {
                    const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "text-3xl font-black tracking-tight block transition-colors",
                            isActive ? "text-[#FF4D8D]" : "text-gray-900 hover:text-gray-600"
                          )}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Mobile Auth Links */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="pt-6 mt-2 border-t border-gray-100 flex flex-col gap-4"
                >
                  {session ? (
                    <>
                      <div className="flex items-center gap-3 mb-2">
                        {session.user?.image ? (
                          <img src={session.user.image} alt={session.user.name || "User"} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <UserCircle size={40} className="text-gray-300" />
                        )}
                        <div>
                          <p className="text-sm font-bold text-gray-900">{session.user?.name || "My Account"}</p>
                          <p className="text-xs text-gray-500">{session.user?.email}</p>
                        </div>
                      </div>
                      <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-gray-700">Profile Settings</Link>
                      <Link href="/bookings" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-gray-700">My Bookings</Link>
                      <button onClick={() => { setIsMobileMenuOpen(false); signOut(); }} className="text-left text-lg font-bold text-red-500 mt-2">Logout</button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-gray-900">Login</Link>
                      <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-[#FF4D8D]">Create Account</Link>
                    </>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="mt-auto"
                >
                  <Link
                    href="/booking"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full py-4 rounded-full bg-black text-white text-lg font-bold shadow-xl shadow-black/20 hover:scale-105 transition-transform"
                  >
                    Book Appointment
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
