import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B4C63',
          light: '#0D5D78',
          dark: '#08394D',
        },
        accent: {
          DEFAULT: '#F47A13',
          light: '#F58A2B',
          dark: '#D3680F',
        },
        dark: {
          DEFAULT: '#123C4A',
          light: '#1A4E5F',
        },
        background: {
          DEFAULT: '#F7FAFC',
          light: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
