module.exports = {
  content: ['./index.html', './src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        main: 'var(--main-font-family, sans-serif)',
      },
    },
  },
  plugins: [],
};
