// Configuration de Vite, l'outil qui lance le serveur de développement
// et qui compile le site pour la production (dossier dist/).
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Le plugin React permet d'écrire du JSX et active le rechargement à chaud.
  plugins: [react()],
});
