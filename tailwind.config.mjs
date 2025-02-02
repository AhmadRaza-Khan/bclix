/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'gradual-bounce': 'gradualBounce 2s ease-in-out infinite',
      },
      keyframes: {
        gradualBounce: {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'ease-in',
          },
          '30%': {
            transform: 'translateY(-20px)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'ease-out',
          },
          '70%': {
            transform: 'translateY(-10px)',
          },
          '90%': {
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [require('daisyui'),],
};
