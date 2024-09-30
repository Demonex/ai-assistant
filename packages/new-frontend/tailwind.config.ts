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
        'auto-fit-290': 'repeat(auto-fit, minmax(300px, 1fr))',
        'auto-fit-235': 'repeat(auto-fit, minmax(235px, 1fr))',
        'auto-fit-156': 'repeat(auto-fit, minmax(156px, 1fr))',
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
        h1Medium: [
          '3.5rem', {
            lineHeight: '110%',
            fontWeight: '900'
          }
        ],
        h1Mobile: [
          '2rem', {
            lineHeight: '110%',
            // letterSpacing: '-0.028rem',
            fontWeight: '700'
          }
        ],
        h2Desctop: [
          '3.5rem', {
            lineHeight: '110%',
            fontWeight: '700'
          }
        ],
        h2Medium: [
          '2.5rem', {
            lineHeight: '110%',
            fontWeight: '900'
          }
        ],
        h2Mobile: [
          '1.5rem', {
            lineHeight: '110%',
            fontWeight: '700'
          }
        ],
        h3Desctop: [
          '2rem', {
            lineHeight: '110%',
            fontWeight: '700'
          }
        ],
        h4Desctop: [
          '1.5rem', {
            lineHeight: '110%',
            fontWeight: '700'
          }
        ],
        h3Mobile: [
          '1.25rem', {
            lineHeight: '110%',
            fontWeight: '500'
          }
        ],
        t1Regular: [
          '1.5rem', {
          lineHeight: '150%',
            fontWeight: '400',
          }
        ],
        t1Mobile: [
          '1.125rem', {
            lineHeight: '150%',
            fontWeight: '400',
          }
        ],
        t1Semi_deck: [
          '2rem', {
            lineHeight: '38.4px',
            fontWeight: '500',
          }
        ],
        t1Semi_mob: [
          '1.5rem', {
            lineHeight: '36px',
            fontWeight: '500',
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
        ],
        captionText: [
          '1rem', {
            lineHeight: '150%',
            fontWeight: '300',
          }
        ],
        caption_m_desk: [
          '1rem', {
            lineHeight: '150%',
            fontWeight: '500',
          }
        ],
        caption_r_desk: [
          '1rem', {
            lineHeight: '24px',
            fontWeight: '400',
          }
        ],
        caption_s_desk: [
          '13px', {
            lineHeight: '15.6px',
            fontWeight: '400',
          }
        ]
      },
      colors: {
        medium_grey: '#7B7B7B',
        dark_grey: '#333333',
        secondary_dark_gray: '#484848',
        popup_gray: '#272727',
        light_grey: '#CCCCCD',
        primary_blue: '#0A5DFC',
        yellow: '#E4FF29',
        secondary_green: '#B3FF00',
        light_blue: '#2067FF',
        secondary_red: '#FF4633',
        magenta: '#A51BC8'
      }
    }
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
} satisfies Config;

