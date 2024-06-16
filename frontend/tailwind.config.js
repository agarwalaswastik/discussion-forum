/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#1f2937",
        darker: "#111827",
        light: "#d1d5db",
        lighter: "#e5e7eb",
      }
    },
  },
  plugins: [],
};
