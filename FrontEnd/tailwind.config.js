/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    letterSpacing: {
      widest: '0.10em'
    },
    extend: {
      fontFamily: {
        'poppins': ['Poppins'],
     },
     colors:{
        purple: "#918DEC",
        limgreen:"#a1fa17",
        orangee:"#dea74b",
        darkPurple:"#b721ff",
        gradx1:"#FFE985",
        gradx2:"#FF52E5"
     }
    },
    screens:{
      xs:'300px',
      sm : '480px',
      md: '768px',
      tb:'900px',
      lg: '1300px',
      xl:'1440px'
    }
  },
  plugins: [],
}