// =============================================================================
// ÉCRAN D'ENTRÉE
// =============================================================================
// Deux rôles :
//  1. Obtenir un CLIC avant de lancer le son (règle des navigateurs).
//  2. Laisser le choix : avec ou sans le son. Le site est complet sans.
// Tant qu'il est affiché, le défilement est bloqué (voir useLenis dans App).
// =============================================================================
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAudio } from '../audio/AudioContext.jsx';
import { prefersReducedMotion } from '../utils/motion.js';

export default function EntryScreen() {
  const { enter } = useAudio();
  const rootRef = useRef(null);
  const firstButtonRef = useRef(null);
  const [visible, setVisible] = useState(true);

  // Accessibilité : on place le focus clavier sur le premier bouton.
  useEffect(() => {
    firstButtonRef.current?.focus();
  }, []);

  // useGSAP est l'équivalent de useEffect pour GSAP : toutes les animations
  // créées ici sont annulées automatiquement si le composant disparaît.
  // contextSafe() « enregistre » aussi les animations lancées plus tard,
  // par exemple dans un gestionnaire de clic.
  const { contextSafe } = useGSAP({ scope: rootRef });

  const handleEnter = contextSafe((withSound) => {
    // On appelle enter() TOUT DE SUITE, pendant le clic : c'est ce qui
    // autorise le navigateur à démarrer l'audio.
    enter(withSound);

    // Puis l'écran disparaît en fondu. autoAlpha = opacity + visibility.
    gsap.to(rootRef.current, {
      autoAlpha: 0,
      duration: prefersReducedMotion() ? 0 : 0.9,
      ease: 'power2.inOut',
      onComplete: () => setVisible(false), // retiré du DOM à la fin
    });
  });

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="entry-title"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink px-6 text-center"
    >
      <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted">
        Portfolio — Gesther Michel
      </p>
      <h1 id="entry-title" className="font-display text-5xl uppercase leading-none sm:text-7xl">
        Ce site est <span className="text-accent">un morceau.</span>
      </h1>
      <p className="mt-6 max-w-md text-muted">
        Chaque section est une partie de la chanson. Défile pour faire évoluer le mixage.
      </p>

      <div className="mt-10 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
        <button
          ref={firstButtonRef}
          type="button"
          onClick={() => handleEnter(true)}
          aria-label="Entrer dans le site avec le son"
          className="rounded-full bg-accent px-7 py-3 font-medium text-ink transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Entrer avec le son 🎧
        </button>
        <button
          type="button"
          onClick={() => handleEnter(false)}
          aria-label="Entrer dans le site sans le son"
          className="rounded-full border border-line px-7 py-3 text-paper transition-colors hover:border-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Entrer sans le son
        </button>
      </div>
    </div>
  );
}
