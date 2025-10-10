import type { Config } from "tailwindcss";

const config: Config = {
  // MANUS: Implementación solicitada - Amplio content para asegurar que todas las utilidades se generen
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: {
          DEFAULT: '#0A2A4E',
          dark: '#061B31',
          light: '#0F3A66',
        },
        secondary: {
          DEFAULT: '#4CAF50',
          dark: '#388E3C',
          light: '#66BB6A',
        },
        accent: {
          DEFAULT: '#FF7F50',
          dark: '#E66A3C',
          light: '#FF9570',
        },
        // Neutral Colors
        neutral: {
          50: '#F5F7FA',
          100: '#E5E7EB',
          200: '#D1D5DB',
          300: '#9CA3AF',
          400: '#6B7280',
          500: '#4B5563',
          600: '#374151',
          700: '#1F2937',
          800: '#111827',
          900: '#0A0A0A',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Custom font sizes for better readability
        'hero': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'hero-mobile': ['2rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h1': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
        'h1-mobile': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h2': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h2-mobile': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h3-mobile': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body-mobile': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'slide-left': 'slideLeft 0.6s ease-out',
        'slide-right': 'slideRight 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 25px rgba(0, 0, 0, 0.12)',
        'hard': '0 10px 40px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 20px rgba(76, 175, 80, 0.3)',
        'glow-accent': '0 0 20px rgba(255, 127, 80, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
