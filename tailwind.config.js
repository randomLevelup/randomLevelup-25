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
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addComponents }) {
      addComponents({
        '.section': {
          '@apply mb-16 relative px-6 py-8 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-purple-500/20': {},
        },
        '.section-heading': {
          '@apply text-2xl font-bold text-purple-400 mb-6 inline-block relative border-b-4 border-dotted border-purple-500/50 pb-2': {},
        },
        '.project-border': {
          '@apply relative p-6 bg-purple-900/10 rounded-r-lg border-l-[3px] border-l-pink-500 hover:border-l-purple-400 transition-colors duration-300': {},
        },
        '.project-title': {
          '@apply text-2xl font-bold text-pink-400 tracking-wider': {},
        },
      });
    },
  ],
}
