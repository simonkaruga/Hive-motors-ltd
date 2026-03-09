'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import Button from '@/components/ui/Button';

export default function NotifyPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    carType: '',
    budget: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Notify form submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen pt-96 pb-64 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl px-16"
        >
          <CheckCircle className="mx-auto mb-24 text-gold" size={80} />
          <h1 className="text-4xl font-display text-gold mb-16">Request Received!</h1>
          <p className="text-cloud text-lg mb-32">
            Thank you for your interest. We'll notify you as soon as we find a car matching your preferences.
            Our team will also reach out to you within 24 hours.
          </p>
          <Button variant="primary" onClick={() => setSubmitted(false)}>
            Submit Another Request
          </Button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-96 pb-64">
      <div className="max-w-3xl mx-auto px-16">
        <SectionHeader 
          title="Can't Find What You're Looking For?" 
          subtitle="Tell us what you need and we'll find it for you in Japan"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 rounded-lg p-32 mb-48 text-center"
        >
          <Bell className="mx-auto mb-16 text-gold" size={48} />
          <h3 className="text-2xl font-display text-gold mb-12">
            We Source Directly from Japan
          </h3>
          <p className="text-cloud">
            Can't find your dream car in our current inventory? No problem! We have direct access to 
            Japanese auctions and dealers. Tell us what you're looking for and we'll find it for you.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div>
              <label className="block text-cloud mb-8">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-16 py-12 bg-midnight border border-gold/20 rounded-lg text-cloud focus:border-gold outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-cloud mb-8">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-16 py-12 bg-midnight border border-gold/20 rounded-lg text-cloud focus:border-gold outline-none"
                placeholder="+254 XXX XXX XXX"
              />
            </div>
          </div>

          <div>
            <label className="block text-cloud mb-8">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-16 py-12 bg-midnight border border-gold/20 rounded-lg text-cloud focus:border-gold outline-none"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-cloud mb-8">Car Type / Model *</label>
            <input
              type="text"
              required
              value={formData.carType}
              onChange={(e) => setFormData({ ...formData, carType: e.target.value })}
              className="w-full px-16 py-12 bg-midnight border border-gold/20 rounded-lg text-cloud focus:border-gold outline-none"
              placeholder="e.g., Toyota Land Cruiser, Nissan X-Trail, Honda CR-V"
            />
          </div>

          <div>
            <label className="block text-cloud mb-8">Budget Range (KSh) *</label>
            <select
              required
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-16 py-12 bg-midnight border border-gold/20 rounded-lg text-cloud focus:border-gold outline-none"
            >
              <option value="">Select budget range</option>
              <option value="500k-1m">500K - 1M</option>
              <option value="1m-2m">1M - 2M</option>
              <option value="2m-3m">2M - 3M</option>
              <option value="3m-4m">3M - 4M</option>
              <option value="4m+">4M+</option>
            </select>
          </div>

          <div>
            <label className="block text-cloud mb-8">Additional Notes</label>
            <textarea
              rows={4}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-16 py-12 bg-midnight border border-gold/20 rounded-lg text-cloud focus:border-gold outline-none resize-none"
              placeholder="Any specific requirements? Year, color, features, etc."
            />
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Submit Request
          </Button>
        </form>
      </div>
    </main>
  );
}
