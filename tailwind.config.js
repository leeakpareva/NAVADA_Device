/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'osoyoo': '800px',
        'touch': { 'raw': '(pointer: coarse)' },
      },
      spacing: {
        'touch': '44px', // Minimum touch target size
      },
      fontSize: {
        'touch-sm': '16px', // Minimum readable size on Osoyoo
        'touch-base': '18px',
        'touch-lg': '20px',
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'spin': 'spin 0.8s linear infinite',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
