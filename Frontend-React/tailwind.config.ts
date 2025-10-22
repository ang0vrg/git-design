/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ← Muy importante
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#16a34a", // verde corporativo
          dark: "#15803d",
        },
      },
    },
  },
  plugins: [],
};
