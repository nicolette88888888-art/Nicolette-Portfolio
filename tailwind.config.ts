import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        powder: '#DCEAF4',
        espresso: '#4B2E2B',
        cream: '#FFF8F1',
        butter: '#F7E9A8',
        dusty: '#F8B7C8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cormorant)', 'var(--font-playfair)', 'serif'],
        playfair: ['var(--font-playfair)', 'serif'],
        handwritten: ['var(--font-caveat)', 'cursive'],
        accent: ['var(--font-sacramento)', 'cursive'],
      },
      boxShadow: {
        polaroid: '0 4px 20px rgba(75, 46, 43, 0.15), 0 1px 3px rgba(75, 46, 43, 0.1)',
        paper: '2px 4px 12px rgba(75, 46, 43, 0.12), 0 1px 2px rgba(75, 46, 43, 0.08)',
        sticky: '1px 3px 8px rgba(75, 46, 43, 0.2)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        steam: 'steam 3s ease-in-out infinite',
        wiggle: 'wiggle 0.5s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        steam: {
          '0%, 100%': { opacity: '0.3', transform: 'translateY(0) scaleX(1)' },
          '50%': { opacity: '0.8', transform: 'translateY(-8px) scaleX(1.1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
