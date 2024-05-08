import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary1: "#114D91",
        primary2: "#4171A7",
        primary3: "#88A6C8",
        primary4: "#C3D2E3",
        primary5: "#F1F5F9",
        secondary1: "#FFC150",
        secondary2: "#FFCD73",
        secondary3: "#FFE0A8",
        secondary4: "#DEDFE1",
        neutral1: "#46494E",
        neutral2: "#55585E",
        neutral3: "#6B6E76",
        neutral4: "#DEDFE1",
        neutral5: "#F4F4F4",
        neutral6: "#FFFFFF",
        red1: "#B00B0B",
        red2: "#D73D3D",
        red3: "#FCC6CD",
        yellow1: "#8F6F00",
        yellow2: "#FFCE22",
        yellow3: "#FFECAA",
        green1: "#1C6A1A",
        green2: "#068913",
        green3: "#CDFECF",
        blue1: "#002C9D",
        blue2: "#2E63EA",
        blue3: "#B0C6FF",
      },
    },
  },
  plugins: [],
};
export default config;
