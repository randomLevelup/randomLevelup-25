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
            },
            screens: {
                'xl2': '1200px',
            },
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
        function({ addComponents }) {
            addComponents({
                // Layout Components
                '.page-container': {
                    '@apply max-w-[1920px] mx-auto flex flex-col lg:flex-row': {},
                },

                // Typography Components
                '.title-text': {
                    '@apply text-4xl font-bold text-primary pr-4 pl-[2.5rem] indent-[-2.5rem]': {},
                },

                // Sidebar Components
                '.sticky-sidebar': {
                    '@apply hidden lg:block w-[25%] xl2:w-[35%] fixed top-0 left-0 h-screen bg-surface backdrop-blur-sm z-50 pt-12': {},
                },
                '.sidebar-content': {
                    '@apply p-8 pl-12 flex flex-col justify-between h-full': {},
                },
                '.nav-list': {
                    '@apply mt-8 space-y-8 mb-16': {},
                },
                '.nav-link': {
                    '@apply block text-xl text-primary hover:text-primary-dark transition-colors': {},
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

                // Header Components
                '.mobile-header': {
                    '@apply lg:hidden container p-8 text-center': {},
                },
                '.subtitle-text': {
                    '@apply mt-2 pt-1 text-gray-400': {},
                },

                // Main Content Components
                '.main-container': {
                    '@apply w-full lg:w-[75%] xl2:w-[65%] px-4 lg:px-12 py-8 lg:ml-[25%] xl2:ml-[35%]': {},
                },
                '.section': {
                    '@apply mb-16 relative px-6 py-8 bg-surface-light/50 backdrop-blur-sm rounded-lg border border-primary-dark/20 scroll-mt-8': {},
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
                '.project-card': {
                    '@apply relative p-6 bg-surface/80 rounded-r-lg border-l-[3px] border-l-primary hover:border-l-primary-dark transition-colors duration-300 flex flex-col md:flex-row gap-6': {},
                },
                '.project-content': {
                    '@apply flex flex-col md:w-1/3': {},
                },
                '.project-title': {
                    '@apply text-2xl font-bold text-primary tracking-wider': {},
                },
                '.project-link': {
                    '@apply mt-2 text-orange-400 hover:underline': {},
                },
                '.project-gallery': {
                    '@apply md:w-2/3 h-[150px] relative overflow-hidden rounded-lg': {},
                },
                '.gallery-container': {
                    '@apply flex absolute top-0 left-0 h-full transition-transform duration-1000 ease-linear': {},
                },
                '.gallery-image': {
                    '@apply h-full object-cover': {},
                },

                // Social Icons Components
                '.social-container': {
                    '@apply pl-12 pb-8 flex flex-wrap gap-6 xl2:gap-12 items-center': {},
                },
                '.social-icons-mobile': {
                    '@apply lg:hidden container p-8 flex justify-center gap-12': {},
                },
                '.social-icon': {
                    '@apply w-6 h-6 min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px]': {},
                },
                '.social-link': {
                    '@apply hover:opacity-50 transition-opacity': {},
                },

                // Footer Components
                '.page-footer': {
                    '@apply mt-16 text-center text-gray-400': {},
                },
            });
        },
    ],
}
