/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./app/**/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#141414",
        oud: "#141414",
        oud2: "#1c1c1c",
        parchment: "#f6f1e4",
        white: "#ffffff",
        gold: "#c9bd9f",
        goldbright: "#ffffff",
        ember: "#8a8a8a",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        accent: ["var(--font-accent)", "serif"],
        script: ["var(--font-script)", "cursive"],
      },
      backgroundImage: {
        "star-field": "radial-gradient(circle at 20% 20%, rgba(20,20,20,0.05), transparent 45%), radial-gradient(circle at 80% 60%, rgba(20,20,20,0.04), transparent 40%)",
      },
      boxShadow: {
        gold: "0 20px 40px -20px rgba(20,20,20,0.15)",
      },
    },
  },
  plugins: [],
};
