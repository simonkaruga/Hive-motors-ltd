'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle, Search, Users, Clock } from 'lucide-react';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import { WHATSAPP_NUMBER } from '@/lib/constants';

const MAKES = ['Toyota', 'Nissan', 'Honda', 'Subaru', 'Mazda', 'Mitsubishi', 'BMW', 'Mercedes', 'Other'];
const BODY_TYPES = ['SUV', 'Sedan', 'Hatchback', 'Pickup', 'Van', 'Coupe'];
const BUDGETS = ['Under KSh 500K', 'KSh 500K – 1M', 'KSh 1M – 2M', 'KSh 2M – 3M', 'KSh 3M – 4M', 'KSh 4M+'];

export default function NotifyPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    make: '',
    bodyType: '',
    budget: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const msg =
      `*Car Request — Hive Motors*\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Make: ${formData.make || 'Any'}\n` +
      `Body Type: ${formData.bodyType || 'Any'}\n` +
      `Budget: ${formData.budget}\n` +
      (formData.notes ? `Notes: ${formData.notes}` : '');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <main className="bg-white min-h-screen pt-32 pb-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg px-6"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-display text-navy-brand mb-3">Request Received!</h1>
          <p className="text-mid-grey text-lg mb-8 leading-relaxed">
            Thank you! We'll reach out within 24 hours when we find a car that matches your preferences.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-mid-grey">
            <span className="flex items-center gap-1.5"><Users size={14} className="text-navy-brand" /> 500+ Customers Helped</span>
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-navy-brand" /> Responds Within 24hrs</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-green-600" /> No Obligation</span>
          </div>
          <button
            onClick={() => setSubmitted(false)}
            className="text-mid-grey hover:text-navy-brand text-sm transition-colors"
          >
            Submit another request
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-grey-soft to-blue-tint border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-14 h-14 bg-red-brand/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search size={28} className="text-red-brand" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display text-navy-brand mb-4">
                Can't Find Your Dream Car?
              </h1>
              <div className="w-16 h-1 bg-red-brand mx-auto mb-4 rounded-full" />
              <p className="text-charcoal text-lg leading-relaxed">
                Tell us exactly what you want and we'll source it for you from anywhere in the world.
                No obligation — just your dream car.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Trust Strip */}
        <RevealOnScroll>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-mid-grey mb-10">
            <span className="flex items-center gap-1.5"><Users size={14} className="text-navy-brand" /> 500+ Customers Helped</span>
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-navy-brand" /> Responds Within 24hrs</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-green-600" /> No Obligation</span>
          </div>
        </RevealOnScroll>

        {/* Form */}
        <RevealOnScroll delay={0.05}>
          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-5">
            <h2 className="text-xl font-display text-navy-brand mb-2">Your Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy-brand mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-charcoal focus:border-red-brand focus:ring-1 focus:ring-red-brand outline-none"
                  placeholder="John Kamau"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-brand mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-charcoal focus:border-red-brand focus:ring-1 focus:ring-red-brand outline-none"
                  placeholder="+254 722 800 436"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-brand mb-1.5">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-charcoal focus:border-red-brand focus:ring-1 focus:ring-red-brand outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div className="border-t border-gray-100 pt-5">
              <h2 className="text-lg font-semibold text-navy-brand mb-4">Your Preferred Car</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-navy-brand mb-1.5">Preferred Make</label>
                  <select
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-charcoal focus:border-red-brand focus:ring-1 focus:ring-red-brand outline-none bg-white"
                  >
                    <option value="">Any Make</option>
                    {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-brand mb-1.5">Body Type</label>
                  <div className="flex flex-wrap gap-1.5">
                    {BODY_TYPES.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, bodyType: formData.bodyType === type ? '' : type })}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                          formData.bodyType === type
                            ? 'bg-red-brand text-white border-red-brand'
                            : 'border-gray-200 text-navy-brand hover:border-navy-brand'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-brand mb-1.5">Budget Range *</label>
                <select
                  required
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-charcoal focus:border-red-brand focus:ring-1 focus:ring-red-brand outline-none bg-white"
                >
                  <option value="">Select your budget</option>
                  {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-brand mb-1.5">Additional Notes</label>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-charcoal focus:border-red-brand focus:ring-1 focus:ring-red-brand outline-none resize-none"
                placeholder="Specific year, colour, features, mileage range..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-red-brand text-white py-4 rounded-xl font-bold text-lg hover:bg-red-dark transition-colors disabled:opacity-70"
            >
              <Bell size={20} />
              {loading ? 'Sending...' : 'Send My Request'}
            </button>
          </form>
        </RevealOnScroll>
      </div>
    </main>
  );
}
