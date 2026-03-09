'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/cars', label: 'Inventory' },
  { href: '/on-transit', label: 'On Transit' },
  { href: '/financing', label: 'Financing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(218,29,23,0.08)] border-b border-red-brand/10'
          : 'bg-gradient-to-b from-white via-white/98 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-20 py-20 flex items-center justify-between">
        {/* Logo with animated underline */}
        <Link href="/" className="group relative">
          <span className="text-3xl font-display font-bold tracking-tight">
            <span className="text-red-brand">HIVE</span>
            <span className="text-navy-brand"> MOTORS</span>
          </span>
          <motion.div 
            className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-red-brand to-red-dark rounded-full"
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-40">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-navy-brand/70 hover:text-red-brand text-[15px] font-medium transition-all duration-300 group"
            >
              {link.label}
              <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-red-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-16">
          <a
            href="tel:+254XXXXXXXXX"
            className="flex items-center gap-8 text-navy-brand hover:text-red-brand transition-colors"
          >
            <Phone size={18} />
            <span className="text-sm font-semibold">Call Us</span>
          </a>
          <Link
            href="/cars"
            className="relative overflow-hidden bg-gradient-to-r from-red-brand to-red-dark text-white px-28 py-12 rounded-full font-semibold text-sm shadow-lg shadow-red-brand/25 hover:shadow-xl hover:shadow-red-brand/40 transition-all duration-300 group"
          >
            <span className="relative z-10">View Cars</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-dark to-red-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-8 text-navy-brand hover:text-red-brand transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-red-brand/10 overflow-hidden"
          >
            <div className="px-20 py-24 space-y-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-16 py-12 text-navy-brand hover:text-red-brand hover:bg-red-brand/5 rounded-lg transition-all text-[15px] font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/cars"
                onClick={() => setMobileOpen(false)}
                className="block bg-gradient-to-r from-red-brand to-red-dark text-white text-center font-semibold px-20 py-14 rounded-full mt-16 shadow-lg"
              >
                View Cars
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
