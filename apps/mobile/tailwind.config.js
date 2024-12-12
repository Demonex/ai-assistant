/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "LabGrotesqueBlack": ["LabGrotesqueBlack"],
        'LabGrotesqueBold' :['LabGrotesqueBold'],
        'LabGrotesqueLight' :['LabGrotesqueLight'],
        'LabGrotesqueMedium':['LabGrotesqueMedium'],
        'LabGrotesqueRegular':['LabGrotesqueRegular']
      },
      fontSize: {
        t2Regular: [
          '1.125rem', {
            lineHeight: '150%',
            fontWeight: '400',
          }
        ],
        h1Mobile: [
          "2rem", {
            lineHeight: "110%",
            // letterSpacing: '-0.028rem',
            fontWeight: "700"
          }
        ],
        h2Mobile: [
          "1.5rem", {
            lineHeight: "110%",
            fontWeight: "700"
          }
        ],
        h3Mobile: [
          "1.25rem", {
            lineHeight: "110%",
            fontWeight: "500"
          }
        ],
        t1Mobile: [
          "1.125rem", {
            lineHeight: "150%",
            fontWeight: "400"
          }
        ],
        t1Semi_mob: [
          "1.5rem", {
            lineHeight: "36px",
            fontWeight: "500"
          }
        ],
        btnText: [
          "1.125rem", {
            lineHeight: "120%",
            fontWeight: "500"
          }
        ],
        captionText: [
          "1rem", {
            lineHeight: "150%",
            fontWeight: "300"
          }
        ],
        caption_m_desk: [
          "1rem", {
            lineHeight: "150%",
            fontWeight: "500"
          }
        ],
        caption_r_desk: [
          "1rem", {
            lineHeight: "24px",
            fontWeight: "400"
          }
        ],
        caption_s_desk: [
          "13px", {
            lineHeight: "15.6px",
            fontWeight: "400"
          }
        ]
      },
      colors: {
        background : '#0C0C0C',
        medium_grey: '#7B7B7B',
        dark_grey: '#333333',
        secondary_dark_gray: '#484848',
        popup_gray: '#272727',
        light_grey: '#CCCCCD',
        primary_blue: '#0A5DFC',
        yellow: '#E4FF29',
        secondary_green: '#B3FF00',
        light_blue: '#2067FF',
        secondary_red: '#FF4633',
        magenta: '#A51BC8'
      }
    }
  },
  plugins: []
};
