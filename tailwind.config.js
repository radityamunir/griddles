/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF9",
        ink: "#1E293B",
        candyPink: "#FF6584",
        electricYellow: "#FFD166",
        skyBlue: "#4D96FF",
        mintGreen: "#06D6A0",
      },
      boxShadow: {
        'cartoon': '4px 4px 0px #1E293B',
        'cartoon-sm': '2px 2px 0px #1E293B',
      },
    },
  },
  plugins: [],
}