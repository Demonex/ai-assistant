import type {Config} from 'tailwindcss';
import {fontFamily} from 'tailwindcss/defaultTheme';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],

  theme: {

    screens: {
      'tablet': '768px',
      // => @media (min-width: 640px) { ... }
      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }
      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      '2lg': '1100px',
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      '3xl': '1600px',
      '4xl': '1980px'

    },
    extend: {

      gridTemplateColumns: {
        'auto-fit-290': 'repeat(auto-fit, minmax(300px, 1fr))'
      },
      fontFamily: {
        sans: ['Lab Grotesque', ...fontFamily.sans],
      },
      fontSize : {
        h1Desctop: [
          '4.68rem', {
            lineHeight: '110%',
            // letterSpacing: '-0.028rem',
            fontWeight: '700'
          }
        ],
        h2Desctop: [
          '3.5rem', {
            lineHeight: '110%',
            fontWeight: '900'
          }
        ],
        h3Desctop: [
          '2rem', {
            lineHeight: '110%',
            fontWeight: '700'
          }
        ],
        t1Regular: [
          '1.5rem', {
          lineHeight: '150%',
            fontWeight: '400',
          }
        ],
        t2Regular: [
          '1.125rem', {
            lineHeight: '150%',
            fontWeight: '400',
          }
        ],
        btnText: [
          '1.125rem', {
            lineHeight: '120%',
            fontWeight: '500'
          }
        ]
      },
      colors: {
        medium_grey: '#6B7280',
        dark_grey: '#333333',
        light_grey: '#CCCCCD',
        primary_blue: '#0A5DFC',
        yellow: '#E4FF29',
        secondary_green: '#B3FF00',
        light_blue: '#2067FF'
      }
    }
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
} satisfies Config;

