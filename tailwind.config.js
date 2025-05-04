/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f9',
          100: '#d9e2ed',
          200: '#b3c7db',
          300: '#8bacc9',
          400: '#6490b7',
          500: '#3d74a5',
          600: '#315d84',
          700: '#254663',
          800: '#193042',
          900: '#0F172A',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};