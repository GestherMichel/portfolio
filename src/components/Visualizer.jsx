// =============================================================================
// VISUALISEUR — anneau de 64 barres dessiné dans un <canvas> 2D
// =============================================================================
// Fixé derrière le contenu. À chaque image (requestAnimationFrame) :
//  - avec le son : chaque barre suit une bande de fréquences (FFT) et l'anneau
//    « respire » (grossit) avec la basse ;
//  - sans le son : les mêmes barres bougent selon une formule (Math.sin).
// On dessine en dehors de React : React ne re-rend pas 60 fois par seconde,
// on manipule directement le canvas, ce qui est beaucoup plus performant.
// =============================================================================
import { useEffect, useRef } from 'react';
import { getLevels } from '../audio/audioEngine.js';
import { prefersReducedMotion } from '../utils/motion.js';

const BARS = 64;

export default function Visualizer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = prefersReducedMotion();

    // Couleur d'accent lue dans la variable CSS --accent (ex. "198 255 61").
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();

    // Valeurs lissées : chaque barre glisse vers sa cible au lieu de sauter.
    const values = new Float32Array(BARS);
    let breath = 0;
    let width = 0;
    let height = 0;
    let frameId = 0;

    // --- Taille du canvas -------------------------------------------------
    // Un écran « Retina » a un devicePixelRatio de 2 ou 3 : 1 pixel CSS =
    // 2 ou 3 pixels physiques. On agrandit le canvas d'autant pour un rendu
    // net, puis on « réduit » le repère de dessin pour travailler en px CSS.
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // max 2 : performance
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // --- Une image ----------------------------------------------------------
    function draw(timeMs) {
      const t = timeMs / 1000;
      const levels = getLevels(); // null si pas de son

      // Cibles : vraies fréquences ou animation calculée.
      for (let i = 0; i < BARS; i++) {
        const target = levels
          ? levels.fft[i]
          : 0.25 + 0.2 * Math.sin(t * 1.3 + i * 0.4) * Math.sin(t * 0.7 + i * 0.13);
        values[i] += (target - values[i]) * 0.2; // lissage (interpolation)
      }
      const bassTarget = levels ? levels.bass : 0.3 + 0.15 * Math.sin(t * 1.6);
      breath += (bassTarget - breath) * 0.15;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const base = Math.min(width, height) * 0.22; // rayon de l'anneau
      const radius = base * (1 + breath * 0.18); // la « respiration »
      const maxLen = base * 0.6;
      const rotation = reduced ? 0 : t * 0.05; // rotation très lente

      ctx.lineCap = 'round';
      ctx.lineWidth = Math.max(2, base * 0.025);

      for (let i = 0; i < BARS; i++) {
        const angle = (i / BARS) * Math.PI * 2 + rotation;
        const len = 4 + values[i] * maxLen;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        ctx.strokeStyle = `rgb(${accent} / ${0.15 + values[i] * 0.45})`;
        ctx.beginPath();
        ctx.moveTo(cx + cos * radius, cy + sin * radius);
        ctx.lineTo(cx + cos * (radius + len), cy + sin * (radius + len));
        ctx.stroke();
      }

      // Mouvements réduits : on dessine une seule image fixe, pas de boucle.
      if (!reduced) frameId = requestAnimationFrame(draw);
    }

    // Redimensionner un canvas l'efface : sans boucle (mouvements réduits),
    // il faut donc redessiner l'image fixe nous-mêmes.
    function onResize() {
      resize();
      if (reduced) draw(0);
    }

    resize();
    window.addEventListener('resize', onResize);
    frameId = requestAnimationFrame(draw);

    // NETTOYAGE : on arrête la boucle et l'écouteur quand le composant
    // disparaît, sinon ils continueraient de tourner en arrière-plan.
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true" // purement décoratif pour les lecteurs d'écran
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
    />
  );
}
