/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind lit ces fichiers pour savoir quelles classes garder dans le CSS final.
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#000000', // fond noir
        paper: '#ffffff', // texte blanc
        muted: '#8a8a8a', // texte secondaire (gris, pour la hiérarchie)
        line: '#222222', // filets et bordures
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
