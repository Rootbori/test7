import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors')

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
			...colors,
			"darkBlue": '#214177',
			"success": '#00BF13',
			"error": '#C10808',
			"wait": '#FFD233',
			"warning": '#FFD233',
			"calendarTripPlan": '#D99BFF',
			"calendarFollowup": '#FECDD3',
			"calendarBirthDate": '#2AACE1',
			"calendarDueBirthDate": '#33B679',
			"calendarPayment": '#FF8686',
		}
  },
  plugins: [],
};
export default config;
