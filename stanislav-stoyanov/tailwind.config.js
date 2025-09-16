/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // scan all React + TSX/JSX files
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Merriweather", "serif"], // your politician-style font
        sans: ["Inter", "sans-serif"],    // optional body font
      },
    },
  },
  plugins: [],
};