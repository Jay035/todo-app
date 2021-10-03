console.log(process.env.NODE_ENV);
const purge = process.env.NODE_ENV === 'production' ? true : false;
module.exports = {
  purge: { enabled: purge, content:['./dist/**/*.html']},
  darkMode: 'class', // or false or 'media'
  theme: {
    extend: {
      colors:{
        'light-white': '#fafafa',
        'input-bg': 'hsl(235, 24%, 19%)',
        'darkModeBg': 'hsl(235, 21%, 11%)',
        'lightTextColor': 'hsl(233, 11%, 84%)',
        'textColor': 'hsl(236, 9%, 61%)',
        'listColor': 'hsl(235, 19%, 35%)',
        'listColorDark': 'hsl(235, 19%, 35%)',
        'attributionColor': '#3e52a3',
        // 'darkModeAttributionCcolor': '#fff',
        // 'titleColor': 'var(--titleTextColor)',
      },
      screens: {
        'mobile-425px': '425px',
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
        'blue-gradient-start': '#57ddff',
        'blue-gradient-end': '#c058f3'
      }),
      fontFamily: {
        'josefin': ['Josefin Sans', 'sans-serif']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

