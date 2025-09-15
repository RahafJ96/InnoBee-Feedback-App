export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#222222", // page bg
        panel: "#222222", // cards/panels
        accent: "#000000", // gold accents
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.35)",
      },
    },
  },
  plugins: [],
};
