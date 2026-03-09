'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/cars', label: 'Inventory' },
  { href: '/on-transit', label: 'On Transit' },
  { href: '/financing', label: 'Financing' },
  { href: '/blog', label: 'Blog' },
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
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-[0_2px_24px_rgba(10,62,102,0.1)] border-b border-navy-brand/8'
          : 'bg-white/95 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-16 py-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-display font-bold">
            <span className="text-red-brand">HIVE</span>
            <span className="text-navy-brand"> MOTORS</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-32">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-charcoal/70 hover:text-navy-brand text-sm font-medium transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-red-brand scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
          <Link
            href="/cars"
            className="bg-red-brand hover:bg-red-dark text-white text-sm font-semibold px-20 py-8 rounded-lg transition-colors shadow-sm"
          >
            Browse Cars
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-navy-brand p-4"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-navy-brand/8 overflow-hidden"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-16 py-12 text-charcoal/70 hover:text-navy-brand hover:bg-grey-soft transition-colors border-b border-navy-brand/5 text-sm"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-16 py-16">
              <Link
                href="/cars"
                onClick={() => setMobileOpen(false)}
                className="block bg-red-brand hover:bg-red-dark text-white text-center font-semibold px-20 py-12 rounded-lg transition-colors"
              >
                Browse Cars
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
