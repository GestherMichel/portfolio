// =============================================================================
// VISUALISEUR — une boule blanche qui réagit à la musique, avec de la fumée
// =============================================================================
// Fixé derrière le contenu, dessiné dans un <canvas> 2D. À chaque image
// (requestAnimationFrame) :
//  - la BOULE grossit avec la basse (« respiration ») et son contour se
//    déforme selon les fréquences (FFT) ;
//  - un HALO lumineux l'entoure, plus fort quand la musique est forte ;
//  - de la FUMÉE (des particules) s'échappe de la boule, monte, grossit et
//    s'efface. Plus la musique est forte, plus il y a de fumée.
// Sans le son, des formules (Math.sin) imitent la musique.
//
// On dessine en dehors de React : React ne re-rend pas 60 fois par seconde,
// on manipule directement le canvas, ce qui est beaucoup plus performant.
// =============================================================================
import { useEffect, useRef } from 'react';
import { getLevels } from '../audio/audioEngine.js';
import { prefersReducedMotion } from '../utils/motion.js';

const POINTS = 64; // nombre de points du contour de la boule
const MAX_PARTICLES = 120; // limite de fumée, pour garder de bonnes performances

// Crée une seule fois une petite image de « bouffée de fumée » : un disque
// blanc dont les bords s'effacent. On la réutilise ensuite pour chaque
// particule (drawImage), bien plus rapide qu'un dégradé recalculé à chaque fois.
function createSmokeSprite() {
  const size = 128;
  const sprite = document.createElement('canvas');
  sprite.width = size;
  sprite.height = size;
  const ctx = sprite.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.35)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return sprite;
}

export default function Visualizer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = prefersReducedMotion();
    const smoke = createSmokeSprite();

    // Valeurs lissées : elles glissent vers leur cible au lieu de sauter.
    const shape = new Float32Array(POINTS); // déformation du contour
    let breath = 0; // « respiration » liée à la basse
    let energy = 0; // énergie globale (halo + quantité de fumée)

    const particles = []; // la fumée
    let toEmit = 0; // fraction de particule à émettre (accumulateur)

    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastTime = 0;

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

    // --- Lecture de la musique (ou imitation sans le son) -------------------
    function readMusic(t) {
      const levels = getLevels(); // null si pas de son
      if (levels) return levels;
      // Sans son : des sinus lents donnent un mouvement « vivant ».
      const fft = new Array(64);
      for (let i = 0; i < 64; i++) {
        fft[i] = 0.3 + 0.2 * Math.sin(t * 1.1 + i * 0.5) * Math.sin(t * 0.6 + i * 0.17);
      }
      return { level: 0.3 + 0.1 * Math.sin(t * 0.8), bass: 0.35 + 0.2 * Math.sin(t * 1.4), fft };
    }

    // --- Une image ----------------------------------------------------------
    function draw(timeMs) {
      const t = timeMs / 1000;
      // dt : temps écoulé depuis l'image précédente, en « images à 60 i/s ».
      // Ainsi, la fumée bouge à la même vitesse sur un écran 60 Hz ou 144 Hz.
      const dt = lastTime ? Math.min(3, (timeMs - lastTime) / 16.67) : 1;
      lastTime = timeMs;

      const music = readMusic(t);

      // Lissage des valeurs (interpolation vers la cible).
      // On utilise la moitié basse du spectre en miroir : le contour reste
      // symétrique et sans « couture » là où le cercle se referme.
      for (let i = 0; i < POINTS; i++) {
        const bin = i < POINTS / 2 ? i : POINTS - 1 - i;
        shape[i] += (music.fft[bin] - shape[i]) * 0.18;
      }
      breath += (music.bass - breath) * 0.15;
      energy += (music.level - energy) * 0.08;

      // Position : la boule dérive doucement. Elle est décalée pour ne pas
      // passer derrière le texte : à droite sur grand écran, dans le coin
      // en haut à droite sur mobile.
      const wide = width >= 768;
      const drift = reduced ? 0 : 1;
      const cx = width * (wide ? 0.7 : 0.85) + Math.sin(t * 0.3) * width * 0.02 * drift;
      const cy = height * (wide ? 0.5 : 0.22) + Math.cos(t * 0.23) * height * 0.03 * drift;
      const base = Math.min(width, height) * (wide ? 0.13 : 0.16);
      const radius = base * (1 + breath * 0.3);

      ctx.clearRect(0, 0, width, height);

      // 1) LA FUMÉE ------------------------------------------------------
      if (!reduced) {
        // Plus la musique est forte, plus on émet de particules.
        toEmit += (0.35 + energy * 2.5) * dt;
        while (toEmit >= 1 && particles.length < MAX_PARTICLES) {
          toEmit -= 1;
          const angle = Math.random() * Math.PI * 2;
          particles.push({
            x: cx + Math.cos(angle) * radius * 0.7,
            y: cy + Math.sin(angle) * radius * 0.7,
            vx: Math.cos(angle) * (0.2 + energy * 0.8),
            vy: Math.sin(angle) * 0.3 - (0.3 + energy * 0.6), // tendance à monter
            size: radius * (0.6 + Math.random() * 0.5),
            life: 0,
            maxLife: 160 + Math.random() * 140, // en images
          });
        }
        toEmit = Math.min(toEmit, 1);

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.life += dt;
          if (p.life >= p.maxLife) {
            particles.splice(i, 1); // la bouffée a disparu : on la retire
            continue;
          }
          // Petite turbulence : la fumée ondule au lieu d'aller tout droit.
          p.vx += Math.sin(t * 0.9 + p.y * 0.01) * 0.015 * dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.size += 0.35 * dt; // la fumée s'étale en montant

          // Apparition puis disparition en douceur (courbe en cloche).
          const progress = p.life / p.maxLife;
          ctx.globalAlpha = Math.sin(progress * Math.PI) * 0.07;
          ctx.drawImage(smoke, p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
        }
        ctx.globalAlpha = 1;
      }

      // 2) LE HALO -------------------------------------------------------
      const glow = ctx.createRadialGradient(cx, cy, radius * 0.6, cx, cy, radius * 3.2);
      glow.addColorStop(0, `rgba(255,255,255,${0.12 + energy * 0.25})`);
      glow.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // 3) LA BOULE ------------------------------------------------------
      // Le contour est un polygone de 64 points dont la distance au centre
      // varie selon les fréquences : la boule « vibre » avec la musique.
      ctx.beginPath();
      for (let i = 0; i <= POINTS; i++) {
        const k = i % POINTS;
        const angle = (k / POINTS) * Math.PI * 2 + (reduced ? 0 : t * 0.1);
        const r = radius * (1 + shape[k] * 0.07); // 0.07 : à augmenter pour plus de vibration
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      // Dégradé du centre vers le bord : donne du volume à la boule.
      const body = ctx.createRadialGradient(
        cx - radius * 0.3, cy - radius * 0.3, radius * 0.1,
        cx, cy, radius * 1.15,
      );
      body.addColorStop(0, '#ffffff');
      body.addColorStop(1, '#bdbdbd');
      ctx.fillStyle = body;
      ctx.fill();

      // Mouvements réduits : une seule image fixe, pas de boucle.
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
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-30 md:opacity-70"
    />
  );
}
