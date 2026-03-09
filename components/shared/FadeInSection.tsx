'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
}

export default function FadeInSection({ children, delay = 0 }: FadeInSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
