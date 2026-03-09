import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="bg-navy-brand mt-64">
      {/* Top red accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-red-brand to-transparent" />

      <div className="max-w-7xl mx-auto px-16 py-48">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-32">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold mb-8">
              <span className="text-red-brand">HIVE</span>
              <span className="text-white"> MOTORS</span>
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-12">
              Premium Japanese import cars in Nairobi, Kenya.
            </p>
            <p className="text-red-brand text-sm font-semibold italic">
              Dream Cars, Real Deals!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-16 text-sm tracking-widest uppercase">
              Quick Links
            </h4>
            <div className="flex flex-col gap-8">
              {[
                { href: '/cars', label: 'Inventory' },
                { href: '/on-transit', label: 'On Transit' },
                { href: '/financing', label: 'Financing' },
                { href: '/blog', label: 'Blog' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/55 hover:text-red-brand transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-16 text-sm tracking-widest uppercase">
              Company
            </h4>
            <div className="flex flex-col gap-8">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/testimonials', label: 'Testimonials' },
                { href: '/notify', label: 'Notify Me' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/55 hover:text-red-brand transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact + Social */}
          <div>
            <h4 className="text-white font-semibold mb-16 text-sm tracking-widest uppercase">
              Contact
            </h4>
            <div className="flex flex-col gap-8 text-white/55 text-sm mb-24">
              <p>📞 +254 XXX XXX XXX</p>
              <p>✉️ hivemotorsltd@gmail.com</p>
              <p>📍 Ridgeways, Kiambu Road, Nairobi</p>
            </div>
            <div className="flex gap-16">
              <a
                href="https://www.instagram.com/hivemotors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 bg-white/10 hover:bg-red-brand rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-all"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/share/1NEPJ6VvYC"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 bg-white/10 hover:bg-red-brand rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-all"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://www.tiktok.com/@hivemotors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 bg-white/10 hover:bg-red-brand rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-all"
              >
                <SiTiktok size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-32 pt-24 flex flex-col sm:flex-row items-center justify-between gap-8 text-white/35 text-xs">
          <p>&copy; {new Date().getFullYear()} Hive Motors Ltd. All rights reserved.</p>
          <p>Japanese Import Cars · Nairobi, Kenya</p>
        </div>
      </div>
    </footer>
  );
}
