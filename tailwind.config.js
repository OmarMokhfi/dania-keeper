const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: "1px",
        1: "1.35px",
        2: "2px",
        3: "3px",
        4: "4px",
        6: "6px",
        8: "8px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        gray: {
          900: "#0D1520",
          800: "#121927",
          700: "#1E252F",
          500: "#79808A",
          400: "#5A5A5A",
          300: "#A7B4AF",
          200: "#C8D0CD",
          100: "#808080",
        },
        purple: {
          900: "#6941C7",
          800: "#7752CB",
          700: "#8362D0",
          600: "#9C79E2",
          500: "#B59BE9",
          400: "#C9B5ED",
          300: "#DBCEF3",
          200: "#E6DEF8",
          100: "#F2EEFB",
        },
      },
    },
  },
  plugins: [],
};
