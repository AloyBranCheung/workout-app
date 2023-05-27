/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")

const textShadowPlugin = plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    {
      "text-shadow": (value) => ({
        textShadow: value,
      }),
    },
    {
      values: theme("textShadow"),
    }
  )
})

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#F94892",
        secondary: "#FF7F3F",
        tertiary: "#FBDF07",
        quartenary: "#89CFFD",
      },
      boxShadow: {
        neobrutShadow: "4px 4px 0px #000000",
      },
      textShadow: {
        textShadow: "1px 1px 0px #000000",
      },
    },
  },
  plugins: [textShadowPlugin],
}
