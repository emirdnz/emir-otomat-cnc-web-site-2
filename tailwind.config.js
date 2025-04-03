/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
import flowbitePlugin from "flowbite/plugin";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {
      colors: {
        "primary-blue": "#427fda",
      },
    },
  },
  plugins: [flowbitePlugin],
});
