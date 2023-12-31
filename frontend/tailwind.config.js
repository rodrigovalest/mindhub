/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#1E1E1E',
        softbase: '#282828',
        lightbase: '#303030',
      },
    },
  },
  plugins: [],
}
