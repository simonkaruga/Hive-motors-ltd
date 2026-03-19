interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeader({ title, subtitle, light = false }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <h2
        className="text-4xl md:text-5xl font-display mb-5 leading-tight"
        style={light ? { color: '#0A3E66' } : { color: '#ffffff', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
      >
        {title}
      </h2>
      <div
        className="w-20 h-[3px] mx-auto mb-5 rounded-full"
        style={light
          ? { background: 'linear-gradient(90deg, transparent, #DA1D17, transparent)' }
          : { background: 'linear-gradient(90deg, transparent, #DA1D17, transparent)', boxShadow: '0 0 12px rgba(218,29,23,0.5)' }
        }
      />
      {subtitle && (
        <p
          className="text-lg max-w-2xl mx-auto leading-relaxed"
          style={light ? { color: 'rgba(26,26,42,0.55)' } : { color: 'rgba(255,255,255,0.45)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
