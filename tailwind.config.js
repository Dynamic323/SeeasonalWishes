/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff385c", // Festive Red
        secondary: "#1e3a8a", // Deep Blue
        accent: "#f59e0b", // Warm Gold
        background: "#f9fafb", // Light background for clarity
        messageBox: "#ffffff", // Clean white for message boxes
        hover: "#f3f4f6", // Slight gray on hover
        button: "#10b981", // Festive Green for buttons
        countdown: "#e11d48", // Vibrant Red for countdown
      },
    },
  },
  plugins: [],
};
