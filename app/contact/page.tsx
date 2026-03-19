'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import { WHATSAPP_NUMBER, PHONE_NUMBER, PHONE_DISPLAY, PHONE_HREF } from '@/lib/constants';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try WhatsApp or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    {
      icon: Phone,
      title: 'Phone',
      primary: PHONE_DISPLAY,
      secondary: 'Click to call directly',
      href: PHONE_HREF,
      color: 'bg-blue-tint',
    },
    {
      icon: Mail,
      title: 'Email',
      primary: 'hivemotorsltd@gmail.com',
      secondary: 'We reply within 24 hours',
      href: 'mailto:hivemotorsltd@gmail.com',
      color: 'bg-red-brand/5',
    },
    {
      icon: MapPin,
      title: 'Location',
      primary: 'Ridgeways, Kiambu Road',
      secondary: 'Nairobi, Kenya',
      href: 'https://maps.google.com',
      color: 'bg-green-50',
    },
    {
      icon: Clock,
      title: 'Hours',
      primary: 'Mon–Fri: 8AM – 6PM',
      secondary: 'Sat: 9AM – 4PM',
      href: null,
      color: 'bg-amber-50',
    },
  ];

  return (
    <main className="bg-white min-h-screen">

      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-grey-soft to-blue-tint border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div>
              <p className="text-sm text-mid-grey mb-2">
                <a href="/" className="hover:text-red-brand">Home</a>
                {' '}<span className="text-gray-300">›</span>{' '}
                <span className="text-red-brand">Contact</span>
              </p>
              <h1 className="text-4xl md:text-5xl font-display text-navy-brand mb-2">Contact Us</h1>
              <p className="text-mid-grey text-lg">We're here to help you find your dream car.</p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* WhatsApp Banner — Primary CTA */}
        <RevealOnScroll>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Hive%20Motors!%20I'm%20looking%20for%20a%20car.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-[#1A8A4A] text-white rounded-2xl p-6 mb-12 hover:bg-[#157a3e] transition-colors group shadow-lg shadow-green-400/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <MessageCircle size={28} />
              </div>
              <div>
                <p className="font-bold text-xl">WhatsApp Us Now</p>
                <p className="text-white/80 text-sm">Fastest way to reach us — reply within minutes</p>
              </div>
            </div>
            <div className="hidden sm:block text-white/80 font-semibold group-hover:translate-x-1 transition-transform">
              Chat Now →
            </div>
          </a>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Form */}
          <RevealOnScroll>
            <div>
              <h2 className="text-2xl font-display text-navy-brand mb-2">Send a Message</h2>
              <div className="w-10 h-0.5 bg-red-brand rounded-full mb-6" />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                >
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="font-bold text-green-700 text-xl mb-2">Message Sent!</h3>
                  <p className="text-green-600">We've received your message and will get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', email: '', message: '' }); }}
                    className="mt-4 text-sm text-mid-grey hover:text-navy-brand transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-brand mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-charcoal focus:border-red-brand focus:ring-1 focus:ring-red-brand outline-none transition-colors bg-white"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-brand mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-charcoal focus:border-red-brand focus:ring-1 focus:ring-red-brand outline-none transition-colors bg-white"
                      placeholder="+254 722 800 436"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-brand mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-charcoal focus:border-red-brand focus:ring-1 focus:ring-red-brand outline-none transition-colors bg-white"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-brand mb-1.5">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-charcoal focus:border-red-brand focus:ring-1 focus:ring-red-brand outline-none transition-colors bg-white resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-red-brand text-white py-4 rounded-xl font-bold text-lg hover:bg-red-dark transition-colors disabled:opacity-70"
                  >
                    <Send size={20} />
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                  {error && (
                    <p className="text-red-brand text-sm text-center">{error}</p>
                  )}
                </form>
              )}
            </div>
          </RevealOnScroll>

          {/* Info Column */}
          <RevealOnScroll delay={0.15}>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-display text-navy-brand mb-2">Get in Touch</h2>
                <div className="w-10 h-0.5 bg-red-brand rounded-full mb-6" />
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactCards.map((card, i) => {
                  const Wrapper = card.href ? 'a' : 'div';
                  const props = card.href ? { href: card.href, target: '_blank', rel: 'noopener noreferrer' } : {};
                  return (
                    <Wrapper
                      key={i}
                      {...props}
                      className={`${card.color} rounded-2xl p-4 ${card.href ? 'hover:shadow-md transition-shadow cursor-pointer' : ''}`}
                    >
                      <card.icon size={20} className="text-navy-brand mb-2" />
                      <p className="font-semibold text-navy-brand text-sm">{card.title}</p>
                      <p className="text-charcoal text-sm mt-1">{card.primary}</p>
                      <p className="text-mid-grey text-xs mt-0.5">{card.secondary}</p>
                    </Wrapper>
                  );
                })}
              </div>

              {/* Social Media */}
              <div>
                <p className="font-semibold text-navy-brand text-sm mb-3">Find us on Social Media</p>
                <div className="flex gap-3">
                  {[
                    { href: 'https://www.instagram.com/hivemotors', icon: Instagram, label: 'Instagram' },
                    { href: 'https://www.facebook.com/share/1NEPJ6VvYC', icon: Facebook, label: 'Facebook' },
                    { href: 'https://www.tiktok.com/@hivemotors', icon: SiTiktok, label: 'TikTok' },
                  ].map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 bg-grey-soft border border-gray-200 hover:bg-navy-brand hover:text-white hover:border-navy-brand rounded-xl flex items-center justify-center text-navy-brand transition-colors"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Google Maps */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm" style={{ height: '260px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176449037!2d36.8219!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMzEuNiJTIDM2wrA0OScxOC44IkU!5e0!3m2!1sen!2ske!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hive Motors Location"
                />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </main>
  );
}
