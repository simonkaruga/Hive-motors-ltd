'use client';

import { motion } from 'framer-motion';
import { Shield, Award, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: Shield,
    step: '01',
    title: 'Quality Assured',
    description: 'Every vehicle thoroughly inspected before import from Japan — only the best make it through.',
  },
  {
    icon: Award,
    step: '02',
    title: 'Direct Import',
    description: 'We source directly from trusted Japanese auctions, cutting out middlemen for better prices.',
  },
  {
    icon: Zap,
    step: '03',
    title: 'Fast Process',
    description: 'Streamlined clearance and delivery. Your car reaches your door faster than anyone else.',
  },
  {
    icon: Users,
    step: '04',
    title: 'Expert Support',
    description: 'A dedicated team guides you through every step — from selection to registration.',
  },
];

export default function WhyChooseUs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -6 }}
          className="group relative bg-white border border-navy-brand/10 rounded-xl p-32 hover:border-red-brand/30 hover:shadow-[0_8px_32px_rgba(218,29,23,0.08)] transition-all duration-300"
        >
          {/* Step number — faint background */}
          <span className="absolute top-16 right-20 text-navy-brand/8 font-mono text-4xl font-bold leading-none select-none">
            {feature.step}
          </span>

          {/* Top accent line on hover */}
          <div className="absolute top-0 left-8 right-8 h-[3px] bg-red-brand opacity-0 group-hover:opacity-100 transition-opacity rounded-b-full" />

          {/* Icon */}
          <div className="w-14 h-14 bg-red-brand/10 rounded-xl flex items-center justify-center mb-24 group-hover:bg-red-brand group-hover:text-white transition-all">
            <feature.icon className="text-red-brand group-hover:text-white transition-colors" size={26} />
          </div>

          <h3 className="text-lg font-semibold text-navy-brand mb-12">{feature.title}</h3>
          <p className="text-charcoal/60 text-sm leading-relaxed">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
