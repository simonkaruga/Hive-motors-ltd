'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md border-b border-gray-200' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-red-brand">HIVE</span>
              <span className="text-navy-brand"> MOTORS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-navy-brand hover:text-red-brand font-medium transition-colors text-[15px]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:+254XXXXXXXXX" className="flex items-center text-navy-brand hover:text-red-brand transition-colors">
              <Phone size={18} className="mr-2" />
              <span className="font-medium text-sm">Call Us</span>
            </a>
            <Link
              href="/cars"
              className="bg-red-brand text-white px-6 py-2.5 rounded-md font-semibold text-sm hover:bg-red-dark transition-colors"
            >
              View Cars
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-navy-brand"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-6 py-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-navy-brand hover:bg-grey-soft rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cars"
              onClick={() => setMobileOpen(false)}
              className="block bg-red-brand text-white text-center px-4 py-3 rounded-md font-semibold mt-4"
            >
              View Cars
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
