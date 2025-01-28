/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['"Roboto Mono"', 'monospace']
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addComponents }) {
      addComponents({
        '.section': {
          '@apply mb-12': {},
        },
        '.section-heading': {
          '@apply text-2xl font-bold text-green-400': {},
        },
        '.project-border': {
          '@apply border-l-4 border-green-400 pl-4': {},
        },
        '.project-title': {
          '@apply text-xl font-bold text-green-400': {},
        },
      });
    },
  ],
}
