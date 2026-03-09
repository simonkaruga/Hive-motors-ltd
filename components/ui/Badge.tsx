interface BadgeProps {
  children: React.ReactNode;
  variant?: 'navy' | 'red' | 'green' | 'amber';
}

export default function Badge({ children, variant = 'navy' }: BadgeProps) {
  const variants = {
    navy:  'bg-navy-brand text-white',
    red:   'bg-red-brand text-white',          // SOLD
    green: 'bg-green-600 text-white',           // Available
    amber: 'bg-amber-500 text-white',           // On Transit
  };

  return (
    <span className={`px-12 py-4 rounded-full text-xs font-semibold uppercase tracking-wide ${variants[variant]}`}>
      {children}
    </span>
  );
}
