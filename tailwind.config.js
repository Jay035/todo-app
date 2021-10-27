console.log(process.env.NODE_ENV);
const purge = process.env.NODE_ENV === 'production' ? true : false;
const plugin = require('tailwindcss/plugin');
module.exports = {
  purge: { enabled: purge, content:['./dist/**/*.html']},
  darkMode: 'class', // or false or 'media'
  theme: {
    extend: {
      transform: ['hover'],
      scale: ['hover'],
      backgroundImage:{
        'checkbox': "url('./images/icon-check.svg')"
      },
      colors:{
        'light-white': '#fafafa',
        'input-bg': 'hsl(235, 24%, 19%)',
        'darkModeBg': 'hsl(235, 21%, 11%)',
        'lightTextColor': 'hsl(233, 11%, 84%)',
        'textColor': 'hsl(236, 9%, 61%)',
        'listColor': 'hsl(235, 19%, 35%)',
        'listColorDark': 'hsl(235, 19%, 35%)',
        'check-before': '#25273c',
        'activeLinkColor': 'hsl(220, 98%, 61%)',
        'checkboxBg': '#4d5066',
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
    extend: {
    },
  },
  plugins: [require('tailwindcss-pseudo-elements'),
          plugin(({addUtilities}) => {
            const newUtilities = {
              ".empty-content": {
                content: "''",
              },
            }
            addUtilities(newUtilities, {
              variants: ["before", "after"],
            });
          })
        ],
};

