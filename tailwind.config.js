const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      gray: colors.blueGray,
      blue: colors.sky,
      yellow: colors.yellow,
      brand: {
        50: "#FFFBEB",
        100: "#FEF3C7",
        200: "#FDE68A",
        300: "#FCD34D",
        400: "#FBBF24",
        500: "#F59E0B",
        600: "#D97706",
        700: "#B45309",
        800: "#92400E",
        900: "#78350F",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      rotate: ["group-hover"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
