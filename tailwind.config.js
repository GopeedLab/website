/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gopeed: '#79C476',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#79C476',
          secondary: '#af051c',
          accent: '#fce8b8',
          neutral: '#1F1C31',
          'base-100': '#F8F6F9',
          info: '#3E70EF',
          success: '#7EE2CB',
          warning: '#F6AB13',
          error: '#F15069',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
