import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import { GOOGLE_REVIEW_URL } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-navy-brand to-navy-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-red-brand">HIVE</span>
              <span className="text-white"> MOTORS</span>
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Quality imported cars in Nairobi, Kenya.
            </p>
            <p className="text-red-brand text-sm font-semibold italic">
              Dream Cars, Real Deals!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { href: '/cars', label: 'Inventory' },
                { href: '/on-transit', label: 'On Transit' },
                { href: '/financing', label: 'Financing' },
                { href: '/import-guide', label: 'Import Guide' },
                { href: '/blog', label: 'Blog' },
                { href: '/about', label: 'About' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/70 hover:text-red-brand transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { href: '/testimonials', label: 'Testimonials' },
                { href: '/notify', label: 'Request a Car' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/70 hover:text-red-brand transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-red-brand transition-colors text-sm"
              >
                ⭐ Review Us
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <div className="flex flex-col gap-2 text-white/70 text-sm mb-6">
              <p>📞 +254 722 800 436</p>
              <p>✉️ hivemotorsltd@gmail.com</p>
              <p>📍 Ridgeways, Kiambu Road, Nairobi</p>
            </div>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/hivemotors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="w-10 h-10 bg-white/10 hover:bg-red-brand rounded-lg flex items-center justify-center text-white transition-colors"
              >
                <Instagram size={18} aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/share/1NEPJ6VvYC"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="w-10 h-10 bg-white/10 hover:bg-red-brand rounded-lg flex items-center justify-center text-white transition-colors"
              >
                <Facebook size={18} aria-hidden="true" />
              </a>
              <a
                href="https://www.tiktok.com/@hivemotors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on TikTok"
                className="w-10 h-10 bg-white/10 hover:bg-red-brand rounded-lg flex items-center justify-center text-white transition-colors"
              >
                <SiTiktok size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Hive Motors Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>Quality Imported Cars · Nairobi, Kenya</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
