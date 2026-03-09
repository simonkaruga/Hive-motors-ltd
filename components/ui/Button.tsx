import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const variants = {
    // Red CTA — primary action
    primary: 'bg-red-brand text-white hover:bg-red-dark shadow-[0_4px_16px_rgba(218,29,23,0.3)] hover:shadow-[0_4px_24px_rgba(218,29,23,0.5)]',
    // Navy — secondary action
    secondary: 'bg-navy-brand text-white hover:bg-navy-light',
    // White outline — on dark backgrounds
    outline: 'border-2 border-white text-white hover:bg-white hover:text-navy-brand',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`px-24 py-12 rounded-lg font-semibold transition-all ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
