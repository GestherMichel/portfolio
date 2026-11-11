// Point d'entrée JavaScript : Vite charge ce fichier depuis index.html.
// Version de départ : React + Tailwind seulement (GSAP et Lenis viendront plus tard).
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
