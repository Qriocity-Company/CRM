/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Add custom grid column configurations here
        16: "repeat(16, minmax(0, 1fr))", // 16-column grid
        24: "repeat(24, minmax(0, 1fr))", // 24-column grid
        // Add more as needed
      },
    },
  },
  plugins: [],
};
