// Point d'entrée JavaScript : Vite charge ce fichier depuis index.html.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import 'lenis/dist/lenis.css'; // petits styles recommandés par Lenis
import './index.css';
import App from './App.jsx';

// On « enregistre » les plugins GSAP une seule fois, au démarrage.
gsap.registerPlugin(ScrollTrigger, useGSAP);

ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode : en développement, React monte les composants deux fois pour
  // détecter les effets mal nettoyés. Aucun effet en production.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
