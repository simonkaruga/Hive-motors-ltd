import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: ReactNode;
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-red-brand text-white hover:bg-red-dark shadow-[0_4px_16px_rgba(218,29,23,0.3)] hover:shadow-[0_4px_24px_rgba(218,29,23,0.5)]',
    secondary: 'bg-navy-brand text-white hover:bg-navy-dark',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-navy-brand',
  };

  return (
    <button
      className={`px-6 py-3 rounded-lg font-semibold transition-all hover:scale-[1.04] active:scale-[0.96] ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
