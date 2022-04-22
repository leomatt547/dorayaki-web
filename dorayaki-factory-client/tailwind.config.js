module.exports = {
  purge: ['./src/**/*.{jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      blue: '#0000FF',
      purple: '#8A2BE2',
      'dark-purple': '#800080',
      red: '#DC143C',
      orange: '#FFAF1C',
      yellow: '#FFD700',
      white: '#FFFFFF',
      black: '#000000',
    },
    outline: {
      none: ['none', null],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
