/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['"Roboto Mono"', 'monospace']
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          sm: '480px',    // reduced from 640px
          md: '580px',    // reduced from 768px
          lg: '680px',    // reduced from 1024px
          xl: '780px',    // reduced from 1280px
          '2xl': '880px', // reduced from 1680px
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '150%', // Makes prose content 50% wider than container
          },
        },
      },
      colors: {
        primary: {
          DEFAULT: '#FFD700', // bright yellow
          dark: '#B8860B',    // darker yellow
        },
        surface: {
          DEFAULT: '#1A1A1A', // very dark gray
          light: '#2D2D2D',   // slightly lighter gray
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addComponents }) {
      addComponents({
        '.section': {
          '@apply mb-16 relative px-6 py-8 bg-surface-light/50 backdrop-blur-sm rounded-lg border border-primary-dark/20': {},
        },
        '.section-heading': {
          '@apply text-2xl font-bold text-primary mb-6 inline-block relative border-b-4 border-dotted border-primary-dark/50 pb-2': {},
        },
        '.project-border': {
          '@apply relative p-6 bg-surface/80 rounded-r-lg border-l-[3px] border-l-primary hover:border-l-primary-dark transition-colors duration-300': {},
        },
        '.project-title': {
          '@apply text-2xl font-bold text-primary tracking-wider': {},
        },
      });
    },
  ],
}
