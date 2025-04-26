/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
      },
      fontSize: {
        '7xl': '4.5rem', 
        '8xl': '5rem',    
        '9xl': '6rem',    
      }
    },
  },
  plugins: [],
}