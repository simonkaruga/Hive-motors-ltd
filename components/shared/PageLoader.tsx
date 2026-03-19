'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function PageLoader() {
  // Start hidden — set visible only client-side to avoid SSR hydration mismatch
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const nav = (navigator as Navigator & { connection?: { effectiveType?: string; saveData?: boolean } }).connection;
    const isSlow = nav?.saveData || nav?.effectiveType === 'slow-2g' || nav?.effectiveType === '2g';
    if (isSlow) return;

    setVisible(true);
    const fadeTimer = setTimeout(() => setFading(true), 500);
    const hideTimer = setTimeout(() => setVisible(false), 800);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-300"
      style={{ opacity: fading ? 0 : 1, pointerEvents: 'none' }}
    >
      <div className="text-center">
        <div className="relative w-48 h-24 mx-auto">
          <Image src="/logo.jpg" alt="Hive Motors" fill sizes="192px" className="object-contain" />
        </div>
        <div className="h-1 bg-red-brand mt-4 rounded-full max-w-xs mx-auto" />
      </div>
    </div>
  );
}
