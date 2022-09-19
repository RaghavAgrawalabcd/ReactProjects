module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        buttonBg: "#c4c4c4",
      },
      minWidth: {
        620: "620px",
        680: "680px",
      },
      spacing: {
        100: "28rem",
        104: "32rem",
        108: "36rem",
        112: "40rem",
        "40per": "40%",
      },
      minHeight: {
        80: "80vh",
        70: "70vh",
        72: "72vh",
        75: "75vh",
        50: "50vh",
        55: "55vh",
        60: "60vh",
        65: "65vh",
        68: "68vh",
        40: "40vh",
        90: "360px",
        106: "424px",
        110: "440px",
        115: "460px",
        125: "500px",
      },
      maxHeight: {
        80: "80vh",
        70: "70vh",
        75: "75vh",
        50: "50vh",
        55: "55vh",
        60: "60vh",
        63: "63vh",
        65: "65vh",
        68: "68vh",
        40: "40vh",
        90: "360px",
        106: "424px",
        110: "440px",
        115: "460px",
        125: "500px",
      },
      height: {
        90: "360px",
        125: "500px",
        135: "540px",
        145: "580px",
      },
      padding: {
        18: "70px",
      },

      fontFamily: {
        Nixie: ["Nixie One"],
      },
      zIndex: {
        "-50": "-50",
        "-40": "-40",
        "-30": "-30",
      },
      screens: {
        xl: "1300",
        "2xl": "2000px",
        "3xl": "2400px",
        "4xl": "2800px",
        // => @media (min-width: 1536px) { ... }
      },
    },
    variants: {
      opacity: ({ after }) => after(["disabled"]),
    },
  },
  plugins: [],
};
