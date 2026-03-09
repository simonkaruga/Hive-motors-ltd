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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative text-center group"
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-brand/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-24">
        <div className="text-7xl md:text-8xl font-display font-bold bg-gradient-to-br from-red-brand via-red-dark to-red-brand bg-clip-text text-transparent mb-12 leading-none">
          {count}<span className="text-red-brand/40">{suffix}</span>
        </div>
        <div className="w-12 h-[3px] bg-gradient-to-r from-transparent via-red-brand to-transparent mx-auto mb-16 rounded-full" />
        <div className="text-navy-brand/70 text-sm font-bold tracking-widest uppercase">{label}</div>
      </div>
    </motion.div>
  );
}
