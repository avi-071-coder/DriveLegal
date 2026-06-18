export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0A0A0A',
          800: '#121212',
          700: '#1A1A1A',
        },
        emerald: {
          DEFAULT: '#10B981',
          glow: 'rgba(16, 185, 129, 0.4)',
        },
        neon: {
          DEFAULT: '#00FF66',
        },
        gray: {
          soft: '#A1A1AA',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },

  plugins: [],
};