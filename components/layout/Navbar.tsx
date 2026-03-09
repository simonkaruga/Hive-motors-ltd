'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md border-b border-gray-200'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-red-brand">HIVE</span>
              <span className="text-navy-brand"> MOTORS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-[14px] font-medium transition-colors ${
                    isActive
                      ? 'text-red-brand'
                      : 'text-navy-brand hover:text-red-brand'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+254722800436"
              className="flex items-center gap-1.5 text-navy-brand hover:text-red-brand transition-colors text-sm font-medium"
            >
              <Phone size={15} />
              Call Us
            </a>
            <Link
              href="/cars"
              className="bg-red-brand text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-dark transition-colors"
            >
              View Cars
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-navy-brand hover:text-red-brand transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-red-brand/10 text-red-brand'
                        : 'text-navy-brand hover:bg-grey-soft'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Mobile CTA */}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <a
                  href="tel:+254722800436"
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-navy-brand"
                >
                  <Phone size={16} />
                  Call Us
                </a>
                <Link
                  href="/cars"
                  onClick={() => setMobileOpen(false)}
                  className="block bg-red-brand text-white text-center px-4 py-3 rounded-lg font-semibold text-sm"
                >
                  Browse Inventory
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
