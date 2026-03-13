// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                teal: { DEFAULT: '#0D9488', light: '#CCFBF1', dark: '#0F766E' },
                rose: { DEFAULT: '#FB7185', light: '#FFE4E6', dark: '#E11D48' },
                brand: '#0D9488',
            },
            fontFamily: {
                cairo: ['Cairo', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
