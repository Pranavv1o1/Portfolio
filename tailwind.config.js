/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FFFCF2',
        stone: '#CCC5B9',
        coffee: '#403D39',
        espresso: '#252422',
        ember: '#EB5E28',
        ink: {
          high: '#252422',
          mid: '#403D39',
          low: '#6b6862',
          faint: '#a8a39c',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        widest: '0.18em',
      },
      animation: {
        'drift-slow': 'driftSlow 30s ease-in-out infinite alternate',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'flow-dash': 'flowDash 2s linear infinite',
        'glow-soft': 'glowSoft 3s ease-in-out infinite',
      },
      keyframes: {
        driftSlow: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '100%': { transform: 'translate(24px, -16px) scale(1.03)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
        flowDash: {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        },
        glowSoft: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
