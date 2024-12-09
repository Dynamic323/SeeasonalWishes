import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        skin: {
          primary: "var(--primary-color)",
          secondary: "var(--secondary-color)",
          background: "var(--background-color)",
          accent: "var(--accent-color)",
          text: "var(--text-color)",
          button: "var(--button-color)",
          "light-text": "var(--light-text-color)",
          "dark-text": "var(--dark-text-color)",
          "dark-primary": "var(--dark-primary-bg)",
          "dark-secondary": "var(--dark-secondary-bg)",
          "dark-accent": "var(--dark-accent-bg)",
          "dark-hover": "var(--dark-hover-bg)",
          "dark-border": "var(--dark-border-color)",
        },
      },
      backgroundImage: {
        "gradient-autumn": "var(--gradient-background)",
        "dark-gradient": "var(--dark-gradient-bg)",
      },
    },
  },
  plugins: [typography],
};
