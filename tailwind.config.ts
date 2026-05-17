import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // PulsePoint Clinic brand colors (from build doc + business card)
      colors: {
        wine: {
          DEFAULT: '#7A1E2C',
          light: '#9b2535',
        },
        navy: {
          DEFAULT: '#0E2A47',
          light: '#1a304d',
        },
        gold: '#C8A96A',
        graybg: '#F5F7FA',
        charcoal: '#1E293B',
        muted: '#6B7280',
      },
      fontFamily: {
        display: ['var(--font-playfair-display)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,.06)',
        cardHover: '0 6px 24px rgba(0,0,0,.10)',
        navBar: '0 1px 8px rgba(0,0,0,.06)',
        stickyCta: '0 -2px 16px rgba(0,0,0,.10)',
      },
      borderRadius: {
        DEFAULT: '10px',
      },
      animation: {
        fadeUp: 'fadeUp 0.55s both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
