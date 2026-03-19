import { Shield, Award, Zap, Users } from 'lucide-react';

const features = [
  { icon: Shield, step: '01', title: 'Quality Assured', description: 'Every vehicle thoroughly inspected before purchase — only the best make it through our selection.' },
  { icon: Award, step: '02', title: 'Global Sourcing', description: 'We source from trusted dealers and auctions worldwide, cutting out middlemen for the best prices in Nairobi.' },
  { icon: Zap, step: '03', title: 'Fast Process', description: 'Streamlined clearance and delivery. Your car reaches your door faster than anyone else in the market.' },
  { icon: Users, step: '04', title: 'Expert Support', description: "A dedicated team guides you from selection to registration — we handle every step so you don't have to." },
];

export default function WhyChooseUs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="group relative rounded-2xl p-px cursor-default hover:-translate-y-2 transition-transform duration-300"
          style={{ background: 'linear-gradient(135deg, rgba(218,29,23,0.2) 0%, rgba(10,62,102,0.08) 50%, rgba(218,29,23,0.05) 100%)' }}
        >
          <div
            className="relative h-full rounded-2xl p-8 transition-all duration-300"
            style={{ background: 'linear-gradient(160deg, rgba(8,18,35,0.95) 0%, rgba(4,10,22,0.98) 100%)', backdropFilter: 'blur(12px)' }}
          >
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 30% 40%, rgba(218,29,23,0.1) 0%, transparent 70%)' }} />
            <div className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full bg-red-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: '0 0 12px rgba(218,29,23,0.8)' }} />
            <span className="absolute bottom-5 right-5 text-6xl font-display font-bold leading-none select-none text-white/[0.04] group-hover:text-white/[0.07] transition-all">
              {feature.step}
            </span>
            <div
              className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
              style={{ background: 'linear-gradient(135deg, rgba(218,29,23,0.15) 0%, rgba(218,29,23,0.05) 100%)', border: '1px solid rgba(218,29,23,0.2)' }}
            >
              <feature.icon className="text-red-brand transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(218,29,23,0.8)]" size={26} />
            </div>
            <div className="text-red-brand/50 text-xs font-bold tracking-[0.25em] uppercase mb-2">Step {feature.step}</div>
            <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-red-brand/90 transition-colors">{feature.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/55 transition-colors">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
