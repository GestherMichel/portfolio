// =============================================================================
// DÉFILEMENT FLUIDE AVEC LENIS
// =============================================================================
// Lenis remplace le défilement saccadé de la molette par un défilement doux.
// Problème : GSAP ScrollTrigger doit savoir exactement où on est à chaque
// image, sinon les animations « sautent ». Solution : une seule horloge.
//   1. GSAP a son « ticker » (une boucle requestAnimationFrame interne).
//   2. On demande à ce ticker de faire avancer Lenis à chaque image.
//   3. Chaque fois que Lenis défile, on prévient ScrollTrigger.
// Comme ça, Lenis et GSAP calculent toujours sur la même image.
//
// Comme pour le moteur audio, l'instance est gardée dans le module : getLenis()
// permet à n'importe quel composant (la navigation, par exemple) de l'utiliser.
// =============================================================================
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../utils/motion.js';

let lenis = null;

export function getLenis() {
  return lenis;
}

// Défile jusqu'à un élément (ex. '#projets'). Utilise Lenis s'il existe,
// sinon le défilement natif du navigateur (cas « mouvements réduits »).
export function scrollToTarget(selector) {
  if (lenis) {
    lenis.scrollTo(selector, { duration: 1.4 });
  } else {
    document.querySelector(selector)?.scrollIntoView();
  }
}

// À appeler UNE fois, dans App. Crée Lenis et le branche sur GSAP au montage.
export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return; // on garde le défilement natif

    lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);

    // Le ticker de GSAP donne le temps en secondes ; Lenis le veut en ms.
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    // Désactive le « rattrapage » de GSAP après un ralentissement : sinon
    // Lenis et GSAP se désynchroniseraient.
    gsap.ticker.lagSmoothing(0);

    // Nettoyage quand le composant disparaît (important en développement,
    // car React 18 monte les effets deux fois en mode strict).
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenis = null;
    };
  }, []);
}
