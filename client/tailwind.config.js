/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const myColors = {
  theme: {
    DEFAULT: "#CC0000",
    50: "#FF8585",
    100: "#FF7070",
    200: "#FF4747",
    300: "#FF1F1F",
    400: "#F50000",
    500: "#CC0000",
    600: "#940000",
    700: "#5C0000",
    800: "#240000",
    900: "#000000",
    secondary: "#890000"
  },
  gray: colors.neutral,
  ...colors,
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
