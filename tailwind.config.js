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
                    sm: '480px',
                    md: '580px',
                    lg: '680px',
                    xl: '780px',
                    '2xl': '880px',
                },
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '150%',
                    },
                },
            },
            colors: {
                primary: {
                    DEFAULT: '#FFD700',
                    dark: '#B8860B',
                },
                surface: {
                    DEFAULT: '#1A1A1A',
                    light: '#2D2D2D',
                }
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
        function({ addComponents }) {
            addComponents({
                // Sidebar Components
                '.sticky-sidebar': {
                    '@apply fixed top-0 left-0 h-screen w-2/5 hidden lg:flex flex-col items-start pt-24 bg-surface backdrop-blur-sm': {},
                },
                '.sidebar-content': {
                    '@apply pl-16 flex-grow': {},
                },
                '.nav-link': {
                    position: 'relative',
                    paddingLeft: '2.5rem',
                    transform: 'translateX(0)',
                    transition: 'transform 0.2s ease-in-out',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: '0',
                        display: 'inline-block',
                        width: '2rem',
                    },
                    '&:hover': {
                        transform: 'translateX(0.5rem)',
                    },
                    '&:hover::before': {
                        content: '"⚡"',
                    },
                },
                '.subtitle-text': {
                    '@apply mt-2 pt-1 text-gray-400': {},
                },

                // Main Content Components
                '.main-container': {
                    '@apply container p-8 pt-4 lg:pt-24 lg:ml-[40%]': {},
                },
                '.section': {
                    '@apply mb-16 relative px-6 py-8 bg-surface-light/50 backdrop-blur-sm rounded-lg border border-primary-dark/20': {},
                },
                '.section-heading': {
                    '@apply text-2xl font-bold text-primary mb-6 inline-block relative border-b-4 border-dotted border-primary-dark/50 pb-2': {},
                },
                '.content-paragraph': {
                    '@apply prose prose-invert mt-4 w-full': {},
                },
                '.skills-list': {
                    '@apply list-disc list-inside text-gray-400': {},
                },

                // Project Components
                '.project-border': {
                    '@apply relative p-6 bg-surface/80 rounded-r-lg border-l-[3px] border-l-primary hover:border-l-primary-dark transition-colors duration-300': {},
                },
                '.project-title': {
                    '@apply text-2xl font-bold text-primary tracking-wider': {},
                },
                '.project-link': {
                    '@apply text-orange-400 hover:underline': {},
                },

                // Social Icons & Links
                '.social-container': {
                    '@apply pl-24 pb-8 flex gap-12': {},
                },
                '.social-link': {
                    '@apply hover:opacity-50 transition-opacity': {},
                },
            });
        },
    ],
}
