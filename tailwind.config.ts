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
        // ── Official Hive Motors Brand Colours ──────────────────────
        'red-brand':  '#DA1D17',  // Hive Red — primary CTA, prices, accents
        'red-dark':   '#B31510',  // Deep Red — hover / pressed states
        'navy-brand': '#0A3E66',  // Navy Blue — navbar, footer, dark sections
        'navy-light': '#0D4F82',  // Light Navy — gradients, hover backgrounds
        'grey-soft':  '#F4F6F8',  // Off White — alternating section backgrounds
        'charcoal':   '#1A1A2A',  // Body text on light backgrounds
        // ── Legacy tokens (kept for any remaining references) ───────
        midnight: { DEFAULT: '#1A1A2E' },
        gold:     { DEFAULT: '#D4AF37', light: '#FDF6E3' },
        cloud:    { DEFAULT: '#F8F9FA' },
        steel:    { DEFAULT: '#4A5568' },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-playfair)'],
        mono: ['var(--font-jetbrains)'],
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
