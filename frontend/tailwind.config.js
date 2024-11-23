/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        "loginPage" : "url('/src/imgs/digitization-6497133.jpg')",
        'custom-gradient': 'linear-gradient(35deg, #494949, #313131)'
      },
      backgroundColor : {
        'facebook' : '#1877f2',
        'twitter' : '#1da1f2',
        'instagram' : '#e1306c'
      },
      keyframes : {
        '0%' : 'translateY(0)',
        '100%' : 'translateY(30px)'
      },
      animation : {
        'up' : 'bounce 3s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}

