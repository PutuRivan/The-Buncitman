import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "Heading-1": [
          "60px",
          {
            lineHeight: "64px",
          },
        ],
        "Heading-2": [
          "45px",
          {
            lineHeight: "52px",
          },
        ],
        "Heading-3": [
          "28px",
          {
            lineHeight: "30px",
          },
        ],
        "Heading-4": [
          "22px",
          {
            lineHeight: "28px",
          },
        ],
        "Heading-5": [
          "18px",
          {
            lineHeight: "28px",
          },
        ],
        "Heading-6": [
          "14px",
          {
            lineHeight: "20px",
          },
        ],
        "Heading-7": [
          "12px",
          {
            lineHeight: "16px",
          },
        ],
      },
      colors: {
        primary: {
          50: "#f5f7fa",
          100: "#eaeef4",
          200: "#d0dbe7",
          300: "#a6bccd",
          400: "#7799b9",
          500: "#557ca2",
          600: "#426287",
          700: "#37506d",
          800: "#30455c",
          900: "#2c3c4e",
          950: "#1f2937",
        },
        secondary: {
          50: "#f7f7ef",
          100: "#e8ead7",
          200: "#d5d7b1",
          300: "#c0c084",
          400: "#aaaa61",
          500: "#9f9753",
          600: "#887d46",
          700: "#6e613a",
          800: "#5d5136",
          900: "#514632",
          950: "#372d1f",
        },
        neutral: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#989898",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#262626",
        },
        success: {
          50: "#e9ffe5",
          100: "#ccffc7",
          200: "#9dff95",
          300: "#60fe58",
          400: "#2ef526",
          500: "#09dc06",
          600: "#00aa00",
          700: "#068509",
          800: "#0b690d",
          900: "#0f5813",
          950: "#013205",
        },
        warning: {
          50: "#fffdea",
          100: "#fff8c5",
          200: "#fff2a5",
          300: "#ffe446",
          400: "#ffd31b",
          500: "#ffb200",
          600: "#e28800",
          700: "#bb5f02",
          800: "#984908",
          900: "#7c3c0b",
          950: "#481e00",
        },
        error: {
          50: "#fff1f4",
          100: "#ffdee5",
          200: "#ffc4cf",
          300: "#ff9bad",
          400: "#ff617f",
          500: "#ff3056",
          600: "#ff111a",
          700: "#c90a2d",
          800: "#a70d29",
          900: "#8a1228",
          950: "#4c0310",
        },
      },
      backgroundImage: {
        "hero-image": "url('/Hero-bg.jpg')",
      },
    },
  },
  plugins: [],
} satisfies Config;
