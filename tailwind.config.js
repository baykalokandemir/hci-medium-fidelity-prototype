/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./app/components/**/*.{js,vue,ts}",
      "./app/layouts/**/*.vue",
      "./app/pages/**/*.vue",
      "./app/plugins/**/*.{js,ts}",
      "./app/app.vue",
      "./app/error.vue"
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    light: '#a5b4fc',
                    DEFAULT: '#4f46e5',
                    dark: '#3730a3',
                },
                surface: '#ffffff',
                background: '#f8fafc'
            }
        }
    },
    plugins: [],
}
