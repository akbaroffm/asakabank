/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customGray: 'rgb(95, 113, 139)',
      },
      boxShadow: {
        'custom-light': 'rgba(149, 157, 165, 0.2) 0px 6px 24px;',
      },
    },
  },
  plugins: [],
};
