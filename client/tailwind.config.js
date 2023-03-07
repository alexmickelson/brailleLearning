/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const myColors = {
  ...colors,
  theme: {
    DEFAULT: "#CC0000",
    50: "#FF8585",
    100: "#FF7070",
    200: "#FF4747",
    300: "#FF1F1F",
    400: "#F50000",
    500: "#CC0000",
    600: "#940000",
    700: "#890000",
    800: "#5C0000",
    900: "#580000",
    secondary: "#890000"
  },
  gray: {
    DEFAULT: '#1C1C1C',
    50: '#B4B4B4',
    100: '#ABABAB',
    200: '#999999',
    300: '#878787',
    400: '#757575',
    500: '#636363',
    600: '#525252',
    700: '#404040',
    800: '#2E2E2E',
    900: '#1C1C1C'
  },
};
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    ...defaultTheme,
    colors: myColors,
  },
  plugins: [],
  darkMode: "class",
};
