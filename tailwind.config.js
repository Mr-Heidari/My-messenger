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
      dimGray:"#494850",
      red:"#dc2626",
      orange:"#ea580c",
      yello:"#ca8a04",
      green:"#16a34a",
      purple2:"#9333ea",
      amber:"#d97706",
      emrald:"#059669",
      teal:"#0d9488",
      cyan:"#0891b2",
      blue:"#2563eb",
      indigo:"#4f46e5",
      violet:"#7c3aed",
      fuchsia:"#c026d3",
      pink:"#ec4899",
      rose:"#e11d48",
      black:"#000000"
    },
    extend: {
      backgroundImage: {
        xImg: "url('/src/assets/x-circle-regular-24.png')",
        addContactIcone: "url('/src/assets/addContactIcone.svg')",
        checkImg: "url('/src/assets/check.svg')",
        phoneImg: "url('/src/assets/phone.svg')",
        hideImg:"url('/src/assets/hide.svg')",
        showImg:"url('/src/assets/show.svg')",
        chatIcone:"url('/src/assets/chatIcone.svg')",
        menuIcone:"url('/src/assets/menuIcone.svg')",
        unreadIcone:"url('/src/assets/unreadIcone.svg')",
        editIcone:"url('/src/assets/editIcone.svg')",
        dotIcone:"url('/src/assets/3dot.svg')",
        deleteIcone:"url('/src/assets/deleteIcone.svg')",
        backArrowIcone:"url('/src/assets/backArrow.svg')",
        sendIcone:"url('/src/assets/sendIcone.svg')",
        SingUpImg:"url('/src/assets/Singupimg.png')",
        LoginNowImg:"url('/src/assets/Loginimg.svg')",
        messengerLogo:"url('/src/assets/MessengerLogo.svg')",
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
