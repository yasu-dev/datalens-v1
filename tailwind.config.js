/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0fc',
          100: '#cce1f9',
          200: '#99c3f3',
          300: '#66a5ed',
          400: '#3387e7',
          500: '#0066CC', // Aeon primary blue
          600: '#0052a3',
          700: '#003d7a',
          800: '#002952',
          900: '#001429',
        },
        secondary: {
          50: '#e6fff6',
          100: '#ccffed',
          200: '#99ffdb',
          300: '#66ffc9',
          400: '#33ffb7',
          500: '#00BF80', // Aeon secondary green
          600: '#00996d',
          700: '#007352',
          800: '#004c36',
          900: '#00261b',
        },
        accent: {
          50: '#fceaef',
          100: '#f9d5de',
          200: '#f3acbd',
          300: '#ed829c',
          400: '#e7597b',
          500: '#E53935', // Accent red
          600: '#b72e2a',
          700: '#892320',
          800: '#5c1715',
          900: '#2e0c0b',
        },
        success: {
          500: '#10B981', // Green success
        },
        warning: {
          500: '#F59E0B', // Orange warning
        },
        error: {
          500: '#EF4444', // Red error
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};