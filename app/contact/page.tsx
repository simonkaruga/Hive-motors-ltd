'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (integrate with EmailJS or API)
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+254 XXX XXX XXX', '+254 XXX XXX XXX'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@hivemotors.co.ke', 'sales@hivemotors.co.ke'],
    },
    {
      icon: MapPin,
      title: 'Location',
      details: ['Mombasa Road', 'Nairobi, Kenya'],
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 4:00 PM'],
    },
  ];

  return (
    <main className="min-h-screen pt-96 pb-64">
      <div className="max-w-7xl mx-auto px-16">
        <SectionHeader 
          title="Contact Us" 
          subtitle="Get in touch with our team. We're here to help you find your dream car."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-48 mb-64">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-display text-gold mb-32">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-24">
              <div>
                <label className="block text-cloud mb-8">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-16 py-12 bg-midnight border border-gold/20 rounded-lg text-cloud focus:border-gold outline-none"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-cloud mb-8">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-16 py-12 bg-midnight border border-gold/20 rounded-lg text-cloud focus:border-gold outline-none"
                  placeholder="+254 XXX XXX XXX"
                />
              </div>

              <div>
                <label className="block text-cloud mb-8">Email *</label>
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
                <label className="block text-cloud mb-8">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-16 py-12 bg-midnight border border-gold/20 rounded-lg text-cloud focus:border-gold outline-none resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <Button type="submit" variant="primary" className="w-full flex items-center justify-center gap-8">
                <Send size={20} />
                {submitted ? 'Message Sent!' : 'Send Message'}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-display text-gold mb-32">Get in Touch</h2>
            
            <div className="space-y-24 mb-48">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex gap-16">
                  <div className="flex-shrink-0">
                    <info.icon className="text-gold" size={24} />
                  </div>
                  <div>
                    <h3 className="text-cloud font-semibold mb-8">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-steel">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-cloud/5 border border-gold/20 rounded-lg overflow-hidden h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176449037!2d36.8219!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMzEuNiJTIDM2wrA0OScxOC44IkU!5e0!3m2!1sen!2ske!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
