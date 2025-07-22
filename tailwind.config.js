/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'lastfm-red': '#d51007',
        'gray-750': '#282828',
        'gray-850': '#181818',
      },
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
  plugins: [],
};
