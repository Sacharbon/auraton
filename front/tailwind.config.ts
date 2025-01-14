import { Poppins } from "next/font/google";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/pages/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        sans: ['var(--font-poppins)'],
      }
    },
  },
  plugins: [],
} satisfies Config;
