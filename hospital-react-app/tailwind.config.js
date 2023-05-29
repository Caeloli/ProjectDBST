/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js, jsx, ts, tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'deep-sea-green': '#0B5755',
        'blue-hosta': '#7FBFB7',
        'aqua-squeeze': '#E1F5F5',
      },
    },
  },
  plugins: [],
}

