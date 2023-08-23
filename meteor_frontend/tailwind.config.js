/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'primary': '#3699ff',
      'secondary': "#e4e6ef",
      'dark': "#1c1c1c",
      black: "#121212",
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      'light-gray': "rgba(77,89,149,.06)",
      'graytext': "#6c7293",
      'muted': '#b5b5c3',
      'appgray': "#7e8299",
      'success': '#1bc5bd',
      'light': "#f3f6f9",
      'gray-dark': "#3f4254",
      'danger': "#f64e60",
      'dark-light': "#16161a",
      'dark-normal': "#4477CE",
      'dark-heavy': "#512B81",
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    // screens: {
    //   '2xl': {'max': '1535px'},
    //   // => @media (max-width: 1535px) { ... }
    //
    //   'xl': {'max': '1279px'},
    //   // => @media (max-width: 1279px) { ... }
    //
    //   'lg': {'max': '1023px'},
    //   // => @media (max-width: 1023px) { ... }
    //
    //   'md': {'max': '767px'},
    //   // => @media (max-width: 767px) { ... }
    //
    //   'sm': {'max': '639px'},
    //   // => @media (max-width: 639px) { ... }
    // }
  },
  plugins: [],
}
