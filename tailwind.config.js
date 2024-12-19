/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  safelist: [
    {
      pattern: /border-(red|green|blue|yellow|gray|indigo)-(500|600|700)/, // Adjust to match your dynamic colors
    },
    {
      pattern: /bg-(red|green|blue|yellow|gray|indigo)-(100|200|300|400|500|600|700)/, // Adjust to match your dynamic colors
    },
    {
      pattern: /text-(red|green|blue|yellow|gray|indigo)-(100|200|300|400|500|600|700|900)/, // Adjust to match your dynamic colors
    },
  ],
  theme: {
    extend: {}
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark"],
  },
}

