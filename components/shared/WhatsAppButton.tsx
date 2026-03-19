'use client';

import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export default function WhatsAppButton() {
  const message = 'Hi Hive Motors! I am interested in your cars.';

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 bg-[#166638] text-white p-4 rounded-full shadow-lg hover:bg-[#125530] hover:scale-110 active:scale-95 transition-all z-50 flex items-center justify-center animate-wa-pulse"
    >
      <MessageCircle size={26} />
    </a>
  );
}
