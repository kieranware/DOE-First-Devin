/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e63946',
          light: '#f48c95',
          dark: '#c81d2a',
        },
        secondary: {
          DEFAULT: '#457b9d',
          light: '#a8dadc',
          dark: '#1d3557',
        },
        background: {
          DEFAULT: '#f1faee',
          dark: '#e9ecef',
        },
      },
    },
  },
  plugins: [],
}
