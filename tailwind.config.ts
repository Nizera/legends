import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-deep": "#071a10",
        "bg-panel": "#0e2e1c",
        green: {
          DEFAULT: "#146b39",
          light: "#1f9b52",
        },
        gold: {
          DEFAULT: "#e4b94e",
          300: "#f6d976",
          700: "#a9791e",
        },
        cream: "#f7f1de",
        ink: "#081208",
      },
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        work: ["Work Sans", "sans-serif"],
        fifa: ["EA Sports", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
