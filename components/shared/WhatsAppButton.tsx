'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export default function WhatsAppButton() {
  const message = 'Hi Hive Motors! I am interested in your cars.';

  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 bg-[#1A8A4A] text-white p-4 rounded-full shadow-lg hover:bg-[#157a3e] transition-colors z-50 flex items-center justify-center"
      animate={{
        boxShadow: [
          '0 0 0 0 rgba(37, 211, 102, 0.4)',
          '0 0 0 14px rgba(37, 211, 102, 0)',
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeOut',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle size={26} />
    </motion.a>
  );
}
