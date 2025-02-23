/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core brand colors first
        primary: {
          DEFAULT: '#AD974F', // brass - main brand color
          dark: '#8E793E', // dark-tan - darker variant
          light: '#D8CFC4', // soft-taupe - lighter variant
        },
        neutral: {
          DEFAULT: '#231F20', // raisin-black - main text color
          gray: '#2E2E2E', // charcoal-gray - secondary dark
          silver: '#C0C0C0', // muted-silver - disabled/inactive
          light: '#EAEAEA', // platinum - light backgrounds/borders
        },
      },
      container: {
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
        },
      },
      borderWidth: {
        3: '3px',
      },
    },
  },
  plugins: [],
};
