module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          yellow: {
            DEFAULT: '#FFAF10',
            dark: '#F97919'
          },
          blue: {
            DEFAULT: '#133295',
            dark: '#03185B'
          },
          green:{
            DEFAULT: '#13e02f',
            dark: '#0caa21',
          },
          red:{
            DEFAULT: '#f03232',
            dark: '#c21818',
          },
          gray:{
            DEFAULT: '#afafaf',
            dark: '#8a8a8a'
          }
        }
      },
      spacing: {
        300: '300px',
        600: '600px'
      },
    },
  },
  plugins: [],
}
