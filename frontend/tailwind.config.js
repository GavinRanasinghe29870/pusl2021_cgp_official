/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"
  ],
  theme: {
    extend: {
      maxWidth: {
        'screen-2xl': '1440px', 
        'custom-1200': '1200px', 
        'custom-900': '900px', 
      },
      colors: {
        'primary': '#0D1271',
        'primary-light': '#D4E4FE',
        'secondary': '#F5E12F',
        'secondary-light': '#FFF6A8'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      fontFamily: {
        'header': ['DM Serif Text', 'serif'],
        'body': ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'header-01': '54px',
        'header-02': '32px',
        'header-03': '24px',
        'header-04': '21px',
        'header-05': '18px',
        'header-06': '16px',
        'body': '16px',
      },
    },
  },
  plugins: [],
}

