module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      animation: ["responsive", "motion-safe", "motion-reduce"],
      opacity: ["disabled", "group-disabled"],
      backgroundColor: ["disabled", "group-disabled"],
      textColor: ["disabled", "group-disabled"],
      padding: ["hover"],
      cursor: ["disabled", "group-disabled"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-interaction-variants"),
  ],
};
