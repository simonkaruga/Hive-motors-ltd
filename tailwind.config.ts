import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'red-brand':  '#DA1D17',  // Hive Red — primary CTA, prices, accents
        'red-dark':   '#B31510',  // Deep Red — hover / pressed states
        'navy-brand': '#0A3E66',  // Navy Blue — headings, navbar text
        'navy-dark':  '#062A47',  // Dark Navy — footer gradient
        'grey-soft':  '#F7F8FA',  // Soft Grey — section backgrounds
        'blue-tint':  '#EEF3F8',  // Light Blue Tint — feature backgrounds
        'charcoal':   '#1A1A2A',  // Body text
        'mid-grey':   '#6B7280',  // Captions and subtitles
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '64': '64px',
        '80': '80px',
        '96': '96px',
        '128': '128px',
      },
    },
  },
  plugins: [],
};
export default config;
