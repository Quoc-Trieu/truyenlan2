/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'green-rgba': 'rgba(36,255,74, 0.4)',
        'background': '#E6ECFF',
      },
      spacing: {
        'header': '80px',
      },
      backgroundImage: {
        'bgac': "url('/src/assets/images/bg-ac.png')",
        'bgavt': "url('/src/assets/images/avt.png')",
      },
    },
  },
  plugins: [],
}