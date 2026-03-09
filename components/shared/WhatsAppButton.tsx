'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappNumber = '254XXXXXXXXX';
  const message = 'Hi, I am interested in your cars at Hive Motors!';

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}
