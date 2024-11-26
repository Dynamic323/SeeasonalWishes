/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        skin: {
          primary: "var(--primary-color)", // Warm red for autumn leaves
          secondary: "var( --secondary-color)", // Warm amber/orange tone
          background: "var(--background-color)", // Soft, warm background tone
          accent: "var(--accent-color)", // Rich gold for accents and highlights
          text: "var(--text-color)", // Dark, almost charcoal color for text
          button: "var(--button-color)", // Bright red for buttons
          "light-text": "var(--light-text-color)", // White text on dark backgrounds
          "dark-text": "var(--dark-text-color)", // Softer, dark gray text on light backgrounds
        },
      },
      backgroundImage: {
        "gradient-autumn": "var(--gradient-background)", // Custom gradient reference
      },
    },
  },
  plugins: [],
};
