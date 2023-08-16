/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
      },
      colors: {
        main: "#666666d9",
        secondary: "#00000008",
      },
      fontFamily: {
        roboto: ["Roboto Condensed", "sans-serif"],
      },
      screens: {
        mobile: "600px",
        tablet: "872px",
        main: "1080px",
        desktop: "1500px",
      },
      maxWidth: {
        main: "1080px",
      },
      boxShadow: {
        "3xl": "0 -15px 30px -15px rgba(0, 0, 0, 0.3)",
      },
      animation: {
        "slide-left":
          "slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-right":
          "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-bottom":
          "slide-bottom 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
      keyframes: {
        "slide-left": {
          "0%": {
            transform: "translateX(150px)",
          },
          "100%": {
            transform: "translateX(0px)",
          },
        },
        "slide-right": {
          "0%": {
            transform: "translateX(-150px)",
          },
          "100%": {
            transform: "translateX(0px)",
          },
        },
        "slide-bottom": {
          "0%": {
            transform: "translateY(-100px)",
          },
          "100%": {
            transform: "translateY(0px)",
          },
        },
      },
    },
  },
  plugins: [],
};
