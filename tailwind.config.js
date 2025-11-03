// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        marx: {
          red: '#e11d48',
          'red-light': '#fecaca',
          'red-hover': '#b91c1c',
        },
        lenin: {
          yellow: '#fbbf24',
          'yellow-light': '#fef3c7',
          'yellow-dark': '#d97706',
        },
      },
      borderColor: {
        'hover-red': '#e11d48',
      },
      boxShadow: {
        header: '0 2px 10px rgba(225, 29, 72, 0.1)',
      },
    },
  },
  plugins: [],
};