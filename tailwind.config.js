module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: "#141414",
        darker: "#0f0f0f",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
