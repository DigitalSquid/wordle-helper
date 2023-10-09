import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {},
    },
    colors: {
      buttonDefault: 'rgb(232,232,236)',
      darkGrey: 'rgb(51,51,51)',
      greyBorder: 'var(--color-tertiary)',
    },
  },
  plugins: [],
};
export default config;
