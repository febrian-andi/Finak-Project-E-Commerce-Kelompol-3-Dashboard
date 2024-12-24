/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      colors: {
        primary : '#6E39CB',
        text : '#3A3541',
        textLight : '#89868D',
        textDisable : '#B4B2B7',
        neutral : '#FFFFFF',
        primaryBackground : '#F4F5F9',
        secondaryBackground : '#E7E7F4',
        primaryBorder : '#DBDCDE',

      }
    },
  },
  plugins: [],
};
