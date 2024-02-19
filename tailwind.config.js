/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      Onyx: "#393D3F",
      Platinum: "#E6E6EA",
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      purple: "#3f3cbb",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#D1345B",
      bermuda: "#78dcca",
      "gold-metalic": "#DEB841",
    },
    extend: {
      backgroundImage: {
        xImg: "url('src/assets/x-circle-regular-24.png')",
        checkImg: "url('src/assets/check.svg')",
        phoneImg: "url('src/assets/phone.svg')",
        hideImg:"url('src/assets/hide.svg')",
        showImg:"url('src/assets/show.svg')",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
        top: "top",
      },
    },
  },
  plugins: [],
};
