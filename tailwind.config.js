/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      colors: {
        "coco-bg": "#F7F3FF",     // soft lavender background
        "coco-text": "#232328",   // dark charcoal
        "coco-accent": "#6D5EF6", // muted purple accent
        "coco-paper": "#FFFFFF",  // cards
        "coco-sand": "#EDE4FF",   // soft purple tint
        "coco-nav-button": "#6D5EF6",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        soft: "0 18px 60px rgba(35, 35, 40, 0.10)",
      },
    },
  },
  plugins: [],
};
