'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Skip loader on slow connections to avoid blocking FCP
    const nav = (navigator as Navigator & { connection?: { effectiveType?: string; saveData?: boolean } }).connection;
    const isSlow = nav?.saveData || nav?.effectiveType === 'slow-2g' || nav?.effectiveType === '2g';
    if (isSlow) { setVisible(false); return; }

    const fadeTimer = setTimeout(() => setFading(true), 600);
    const hideTimer = setTimeout(() => setVisible(false), 900);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-300"
      style={{ opacity: fading ? 0 : 1, pointerEvents: fading ? 'none' : 'auto' }}
    >
      <div className="text-center">
        <div className="relative w-64 h-32 mx-auto">
          <Image src="/logo.jpg" alt="Hive Motors" fill sizes="256px" className="object-contain" priority />
        </div>
        <div className="h-1 bg-red-brand mt-4 rounded-full max-w-xs mx-auto" />
      </div>
    </div>
  );
}
