/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        texto:"#06283D",
        fondoClaro:"#DFF6FF",
        fondoOscuro:"#1363DF",
        normal:"#47B5FF"
      },
    },
  },
  plugins: [],
}
