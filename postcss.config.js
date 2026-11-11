// PostCSS transforme le CSS pendant la compilation :
// - tailwindcss génère seulement les classes utilisées dans le code ;
// - autoprefixer ajoute les préfixes navigateurs (-webkit-, etc.) au besoin.
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
