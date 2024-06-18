import fluid, { extract } from "fluid-tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: { files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], extract },
  safelist: [],
  theme: {
    /** @type {import('fluid-tailwind').FluidThemeConfig} */
    fluid: () => ({
      defaultScreens: ["20rem", "80rem"],
    }),
    extend: {
      spacing: {
        120: "30rem",
      },
      colors: {
        dark: {
          gray: "#374151",
          primary: "#1f2937",
          secondary: "#111827",
          text: "#f3f4f6",
          accent: "#34d399",
          slate: "#475569",
        },
        light: {
          gray: "#d1d5db",
          primary: "#e5e7eb",
          secondary: "#f3f4f6",
          text: "#111827",
          accent: "#059669",
          slate: "#94a3b8",
        },
      },
    },
  },
  plugins: [fluid],
};
