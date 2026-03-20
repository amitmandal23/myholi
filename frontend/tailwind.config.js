/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#F47521', // Updated to Logo Orange
        'brand-blue': '#002C51',  // Updated to Logo Dark Blue
        'brand-teal': '#00909E',
        'brand-orange': '#F47521', // Added explicit alias
        'brand-dark': '#002C51',   // Added explicit alias
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
