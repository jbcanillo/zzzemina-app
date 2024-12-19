const path = require('path');

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Add modern font family
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#00adff",
          secondary: "#00dcff",
          accent: "#a46300",
          neutral: "#000b06",
          "base-100": "#292b30",
          info: "#009abb",
          success: "#81d44b",
          warning: "#ffc806",
          error: "#ff5b69",
        },
      },
    ],
  },
};
