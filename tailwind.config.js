/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      boxShadow: {
        'text-custom': '0px 0px 5px black', // Customize the shadow
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out'
      },
    },
  },
  plugins: [],
};
