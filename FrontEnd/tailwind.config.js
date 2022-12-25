/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    letterSpacing: {
      widest: '0.05em'
    },
    extend: {
      fontFamily: {
        'poppins': ['Poppins'],//2a2c3f
     },
     colors:{
        borderPurple: "#b983f7",
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
      lg: '1366px',
      xl:'1536px',
      sam:'1600px'
    }
  },
  plugins: [],
}