import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    '.backface-visible': {
      'backface-visibility': 'visible',
      '-moz-backface-visibility': 'visible',
      '-webkit-backface-visibility': 'visible',
      '-ms-backface-visibility': 'visible',
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden',
      '-moz-backface-visibility': 'hidden',
      '-webkit-backface-visibility': 'hidden',
      '-ms-backface-visibility': 'hidden',
    },
  });
});

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        black: '#000',
        neutral: {
          50: '#F2F2F2',
          100: '#EBEAEF',
          200: '#DBDBE2',
          300: '#C4C4CC',
          400: '#ADADB6',
          500: '#75757C',
          600: '#3B3A45',
          700: '#2E2D36',
          750: '#1A1A1A',
          800: '#111117',
        },
        primary: {
          50: '#F9F1FF',
          100: '#DAA7FE',
          200: '#A23BEA',
          250: '#EA00FF',
          300: '#7A10C5',
          400: '#570393',
          500: '#3B0065',
          600: '#3F2057',
          650: '#4B405A',
          700: '#260141',
          800: '#2D0D4D',
        },
        secondary: {
          50: '#EDEFFE',
          100: '#B0B8FF',
          200: '#8490FF',
          300: '#6951FF',
          400: '#5100FE',
          500: '#3D05B5',
          600: '#1E0258',
        },
        warning: {
          50: '#FFF8EB',
          100: '#FFF0D1',
          200: '#FFE09F',
          300: '#FFD886',
          400: '#FFC85B',
          500: '#FFBB38',
          600: '#E59B10',
          700: '#BD7E06',
          800: '#744C01',
          900: '#332100',
        },
        error: {
          50: '#FFEBEF',
          100: '#FFD2DC',
          200: '#FDA1B5',
          300: '#FC8AA3',
          400: '#FA6182',
          500: '#F54168',
          600: '#DF1642',
          700: '#BA0930',
          800: '#72021A',
          900: '#33000B',
        },
        success: {
          50: '#EBFFEB',
          100: '#D4FDD3',
          200: '#A6F8A5',
          300: '#91F58F',
          400: '#6CF16A',
          500: '#50EA4D',
          600: '#28D025',
          700: '#1BAA18',
          800: '#086907',
          900: '#013300',
        },
        'rgba-success-700': 'rgba(0, 127, 103, 0.20)',
      },
      backgroundImage: {
        'gradiant-layout':
          'radial-gradient(102.76% 214.4% at 50% -78.19%, rgba(122, 16, 197, 0.32) 32.53%, rgba(17, 4, 20, 0.00) 100%)',
        'gradiant-body': 'linear-gradient(180deg, #050505 0%, #110015 100%)',
        'gradiant-box': 'linear-gradient(180deg, #1A1A1A 20.43%, #220A3B 100%)',
        'gradiant-border':
          'linear-gradient(135deg, #7A10C5 0.05%, rgba(122, 16, 197, 0.04) 52.13%, #7A10C5 100.05%)',
        'gradiant-glow': 'radial-gradient(#C472FF, #7A10C5 80%)',
        'gradiant-slide': 'linear-gradient(180deg, #7A10C5 0%, #DD04F1 100%)',
        'gradiant-inside-horiz':
          'linear-gradient(180deg, #2E2D36, transparent 30%, transparent 70%, #2E2D36)',
        'gradiant-blur': 'linear-gradient(247.35deg, rgba(250, 0, 255, 0.17) 1.52%, rgba(255, 255, 255, 0) 101.92%)',
        'gradiant-text': 'linear-gradient(118.71deg, #FAFF00 28.61%, #FF5BCF 58.83%, #5100FE 103.65%, #52008C 120.05%)',
      },
      fontSize: {
        xs: ['12px', '18px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        md: ['18px', '28px'],
        lg: ['20px', '30px'],
        xl: ['22px', '28px'],
        '2xl': ['24px', '30px'],
        '3xl': ['32px', '40px'],
        '4xl': ['40px', '48px'],
        '5xl': ['48px', '56px'],
      },
      boxShadow: {
        checkbox: '0px 0px 0px 3px rgba(0, 127, 103, 0.10)',
        label: 'inset -2px -2px 100px rgba(255, 255, 255, 0.1), inset 2px 2px 100px rgba(66, 66, 66, 0.1)'
      },
      transitionProperty: {
        'height': 'height'
      }
    },
  },
  plugins: [require('tailwindcss-animate'), backfaceVisibility],
};

export default config;
