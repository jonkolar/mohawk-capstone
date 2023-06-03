/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  plugins: [require("flowbite/plugin")],
}
