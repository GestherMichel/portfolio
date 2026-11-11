/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind lit ces fichiers pour savoir quelles classes garder dans le CSS final.
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0b0b', // fond presque noir
        paper: '#ededed', // texte clair
        muted: '#8a8a8a', // texte secondaire
        line: '#262626', // filets et bordures
        // La couleur d'accent vient d'une variable CSS (src/index.css) :
        // on la change à UN seul endroit et Tailwind + le canvas suivent.
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Anton', 'Impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
