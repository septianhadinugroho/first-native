/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // blue-500
        secondary: '#60a5fa', // blue-400
        accent: '#1d4ed8', // blue-700
        background: '#eff6ff', // blue-50
        text: '#1e293b', // slate-800
        // Dark mode colors
        'dark-primary': '#60a5fa', // blue-400
        'dark-secondary': '#3b82f6', // blue-500
        'dark-accent': '#93c5fd', // blue-300
        'dark-background': '#0f172a', // slate-900
        'dark-text': '#f1f5f9', // slate-100
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'poppins-bold': ['Poppins-Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};