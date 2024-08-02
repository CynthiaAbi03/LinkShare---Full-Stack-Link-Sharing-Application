import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purplePrimary: "hsl(var(--purplePrimary))",
        purpleHover: "hsl(var(--purpleHover))",
        lightPurple: "hsl(var(--lightPurple))",
        darkGrey: "hsl(var(--darkGrey))",
        themeGrey: "hsl(var(--themeGrey))",
        border: "hsl(var(--border))",
        lightGrey: "hsl(var(--lightGrey))",
        lightGrey2: "hsl(var(--lightGrey2))",
        white: "hsl(var(--white))",
        redTheme: "hsl(var(--redTheme))",
        github: "hsl(var(--github))",
        frontendMentor: "hsl(var(--frontendMentor))",
        twitter: "hsl(var(--twitter))",
        linkedIn: "hsl(var(--linkedIn))",
        youtube: "hsl(var(--youtube))",
        facebook: "hsl(var(--facebook))",
        twitch: "hsl(var(--twitch))",
        devto: "hsl(var(--devto))",
        codewars: "hsl(var(--codewars))",
        freeCodeCamp: "hsl(var(--freecodecamp))",
        gitlab: "hsl(var(--gitlab))",
        hashnode: "hsl(var(--hashnode))",
        stackoverflow: "hsl(var(--stackoverflow))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'activeShadow': '0px 0px 32px 0px hsla(var(--activeShadow))',
        'defaultShadow': '0px 0px 32px 0px var(--defaultShadow)',
      },
      fontWeight: {
        'bold': "var(--bold)",
        'semibold': "var(--semibold)",
        'regular' : "var(--regular)",
      },
      lineHeight: {
        150: "var(--line-height)", 
      },
      fontSize: {
        'lg' : "2rem",
        'md' : "1rem",
        'sm' : "0.75rem",
      },
      screens: {
        'max-sm': {'max': '640px'},
        'custom': {'min': '768px', 'max': '1028px'},
        ...defaultTheme.screens,
      }
    },
  },
  plugins: [],
};

export default config;
