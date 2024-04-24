/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.js'],
  theme: {
    extend: {
      backgroundColor: {'form-control-color': '#ff0000'},
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "synthwave"],
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}

