/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        docker: {
          blue: '#2496ed',
          darkblue: '#1a73e8',
          lightblue: '#64b5f6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Monaco', 'Menlo', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'gradient': 'gradient 15s ease infinite',
        'gradient-reverse': 'gradientReverse 20s ease infinite',
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
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        gradient: {
          '0%, 100%': { 
            'background-size': '200% 200%',
            'background-position': 'left top'
          },
          '50%': { 
            'background-size': '200% 200%',
            'background-position': 'right bottom' 
          },
        },
        gradientReverse: {
          '0%, 100%': { 
            'background-size': '200% 200%',
            'background-position': 'right bottom'
          },
          '50%': { 
            'background-size': '200% 200%',
            'background-position': 'left top' 
          },
        },
      },
      animationDelay: {
        '2000': '2s',
        '4000': '4s',
        '6000': '6s',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}