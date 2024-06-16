/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [{ pattern: /.*-(dark|light)-(primary|secondary|text|accent|slate)/ }],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "#1f2937",
          secondary: "#111827",
          text: "#f3f4f6",
          accent: "#34d399",
          slate: "#475569",
        },
        light: {
          primary: "#e5e7eb",
          secondary: "#f3f4f6",
          text: "#111827",
          accent: "#059669",
          slate: "#94a3b8",
        },
      },
    },
  },
  plugins: [],
};
