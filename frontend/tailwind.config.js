import tailwindForms from "@tailwindcss/forms";

import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef9ff",
          100: "#d9f2ff",
          200: "#bbe9ff",
          300: "#8ddcff",
          400: "#57c6ff",
          500: "#31a9ff",
          600: "#198bf6",
          700: "#1373e2",
          800: "#165db7",
          900: "#184f90",
          950: "#143157",
        },
        secondary: { 500: "#ED3B7C", 600: "#2df" },
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [tailwindForms],
};
