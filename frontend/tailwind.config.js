/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        "loginPage" : "url('/src/imgs/digitization-6497133.jpg')",
        'custom-gradient': 'linear-gradient(35deg, #494949, #313131)',
      },
    },
  },
  plugins: [],
}

