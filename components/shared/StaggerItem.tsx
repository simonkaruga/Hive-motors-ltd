'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerItemProps {
  children: ReactNode;
  index: number;
}

export default function StaggerItem({ children, index }: StaggerItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  );
}
