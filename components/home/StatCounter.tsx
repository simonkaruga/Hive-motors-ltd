'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatCounterProps {
  end: number;
  label: string;
  suffix?: string;
}

export default function StatCounter({ end, label, suffix = '' }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) { setCount(end); clearInterval(timer); }
        else { setCount(Math.floor(start)); }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      className="text-center"
    >
      <div className="text-6xl md:text-7xl font-display text-red-brand mb-8 leading-none">
        {count}<span className="text-red-brand/50">{suffix}</span>
      </div>
      <div className="w-8 h-[2px] bg-red-brand/30 mx-auto mb-12" />
      <div className="text-navy-brand/60 text-sm font-medium tracking-widest uppercase">{label}</div>
    </motion.div>
  );
}
