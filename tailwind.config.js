/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0a1628",
          900: "#0d1f35",
          800: "#112540",
          700: "#163050",
        },
        gold: {
          300: "#f0d080",
          400: "#d4a843",
          500: "#c49a35",
          600: "#a07828",
        },
        chalk: "#e8e8e0",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        display: ["'Cormorant Garamond'", "serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        sans: ["'DM Sans'", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "rotate-slow": "rotate 20s linear infinite",
        "shimmer": "shimmer 2s linear infinite",
        "fadeUp": "fadeUp 0.7s ease forwards",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(212,168,67,0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(212,168,67,0.6)" },
        },
      },
    },
  },
  plugins: [],
};
