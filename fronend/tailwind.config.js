/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      display: ["Poppins", "sans-serif"]
    },
    extend: {
      // Color
      colors: {
        primary:"#05B6D3",
        secondary: "#EF863E",
        tertiary: '#222222',
        slate: {
          10: '#f1f3f3f4'
        },
        green: {
          50:'#30AF5B',
          90:'#292C27',
        },
        gray: {
          10: '#EEEEEE',
          20: '#A2A2A2',
          30: '#7B7B7B',
          50: '#585858',
          90: '#141414',
        },
      },
    },
  },
  plugins: [],
}