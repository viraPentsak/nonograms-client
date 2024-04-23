/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily:{
                'sans': ['"Roboto"', ...defaultTheme.fontFamily.sans]
            },
            fontSize: {
                none: '0px'
            },
            backgroundImage: {
                cross: `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg height='800px' width='800px' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 449.998 449.998' xml:space='preserve'%3E%3Cg%3E%3Cpolygon style='fill:%2364748b;' points='449.974,34.855 415.191,0 225.007,190.184 34.839,0 0.024,34.839 190.192,224.999 0.024,415.159 34.839,449.998 225.007,259.797 415.191,449.998 449.974,415.143 259.83,224.999 '/%3E%3C/g%3E%3C/svg%3E")`
            },
            backgroundSize: {
                '80%': '80%'
            }
        },
    }
}