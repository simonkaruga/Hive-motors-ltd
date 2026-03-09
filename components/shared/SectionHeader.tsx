'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  light?: boolean; // true = on light (white/grey) bg; false = on dark (navy) bg
}

export default function SectionHeader({ title, subtitle, light = false }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-64"
    >
      <h2 className={`text-4xl md:text-5xl font-display mb-16 leading-tight ${
        light ? 'text-navy-brand' : 'text-white'
      }`}>
        {title}
      </h2>

      {/* Red accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-16 h-[3px] bg-red-brand mx-auto mb-16 origin-center"
      />

      {subtitle && (
        <p className={`text-lg max-w-xl mx-auto leading-relaxed ${
          light ? 'text-charcoal/60' : 'text-white/50'
        }`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
