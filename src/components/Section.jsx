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
import { tr, useLang } from '../i18n/LanguageContext.jsx';

export default function Section({ id, index, number, label, children }) {
  const ref = useRef(null);
  const { lang } = useLang();

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
      aria-label={tr(label, lang)} // nom de la section pour les lecteurs d'écran
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-28 sm:px-8"
    >
      {/* Sur-titre : seulement le numéro et un filet. Le nom de la section
          est déjà dans le grand titre et dans le menu : pas de doublon. */}
      <p data-reveal aria-hidden="true" className="mb-8 flex items-center gap-3 text-xs tracking-[0.3em]">
        <span className="text-accent">{number}</span>
        <span className="h-px w-10 bg-line" />
      </p>
      {children}
    </section>
  );
}
