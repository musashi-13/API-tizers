import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F8F6F4', //background
          100: '#2D9596', //navbar
          200: '#C0FAF7', //elements
          300: '#0F0F0F'  //darkmode
        },
        light: {
          50: '#F8F6F4',
          100: '#C8C6C4',
          200: '#989694'
        },
        dark: {
          50: '#0F0F0F',
          100: '#2F2F2F',
          200: '#4F4F4F'
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
export default config;
