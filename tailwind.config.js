// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: '#C2185B',
                    light: '#FDE8EF',
                    petal: '#F5B8CE',
                    dark: '#8B1245',
                    deep: '#6B1535',
                    50: '#FFF5F8',
                    100: '#FDE8EF',
                    200: '#F9D0DF',
                    400: '#F5B8CE',
                    600: '#C2185B',
                    700: '#8B1245',
                    900: '#6B1535',
                },
            },
            fontFamily: {
                cairo: ['Cairo', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
