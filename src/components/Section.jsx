// =============================================================================
// SECTION RÉUTILISABLE
// =============================================================================
// Chaque partie du morceau utilise ce composant. Il fait deux choses :
//  1. Quand la section occupe le centre de l'écran, il dit au moteur audio
//     de passer au mixage de cette section (audioEngine.setSection).
//  2. Il fait apparaître en douceur tous ses éléments marqués data-reveal.
//
// ScrollTrigger observe la position d'un élément pendant le défilement.
//   start: 'top center'    → le HAUT de la section atteint le CENTRE de l'écran
//   end:   'bottom center' → le BAS de la section atteint le CENTRE de l'écran
// Entre les deux, la section est « active ».
// =============================================================================
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import * as audioEngine from '../audio/audioEngine.js';

export default function Section({ id, index, number, label, kicker, children }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      // 1) Changement de mixage.
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) audioEngine.setSection(index);
        },
      });

      // 2) Apparitions. matchMedia n'exécute ce bloc que si la personne
      //    n'a PAS demandé de réduire les animations.
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Grâce à "scope", ce sélecteur ne cherche QUE dans cette section.
        gsap.from('[data-reveal]', {
          opacity: 0,
          y: 40, // transform: translateY → performant (pas de recalcul de mise en page)
          duration: 1,
          ease: 'power3.out',
          stagger: 0.08, // chaque élément démarre 0,08 s après le précédent
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        });
      });

      return () => mm.revert();
    },
    { scope: ref }, // limite les sélecteurs + nettoyage automatique
  );

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={`${id}-titre`}
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-28 sm:px-8"
    >
      <p data-reveal className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
        <span className="text-accent">{number}</span>
        <span aria-hidden="true" className="h-px w-10 bg-line" />
        <span id={`${id}-titre`}>{label}</span>
        {kicker && <span className="hidden sm:inline">· {kicker}</span>}
      </p>
      {children}
    </section>
  );
}
