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
    DEFAULT: '#000000',
    50: '#C3C3C3',
    100: '#B8B8B8',
    200: '#A1A1A1',
    300: '#8A8A8A',
    400: '#737373',
    500: '#5C5C5C',
    600: '#454545',
    700: '#2E2E2E',
    800: '#171717',
    900: '#000000'
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
