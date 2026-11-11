// 01 — Intro : seulement la piste d'ambiance.
import Section from '../components/Section.jsx';
import { SECTIONS } from '../data/projects.js';
import { scrollToTarget } from '../hooks/useLenis.js';

export default function Intro() {
  return (
    <Section {...SECTIONS[0]} index={0}>
      <h2 data-reveal className="font-display text-[15vw] uppercase leading-[0.9] sm:text-[10vw] lg:text-[9rem]">
        Gesther
        <br />
        Michel<span className="text-accent">.</span>
      </h2>
      <p data-reveal className="mt-8 max-w-xl text-lg text-muted sm:text-xl">
        Développeur logiciel et Web, compositeur. Finissant en Techniques de l'informatique
        (génie logiciel) au Collège de Bois-de-Boulogne, à Montréal.
      </p>
      <p data-reveal className="mt-4 max-w-xl text-paper">
        Je cherche un <span className="text-accent">stage</span> pour l'hiver 2027 (19 janvier au 30 avril).
      </p>
      <a
        data-reveal
        href="#projets"
        onClick={(e) => {
          e.preventDefault();
          scrollToTarget('#projets');
        }}
        className="mt-12 inline-flex w-fit items-center gap-3 text-sm uppercase tracking-[0.2em] text-muted transition-colors hover:text-paper"
      >
        Écouter la suite <span aria-hidden="true">↓</span>
      </a>
    </Section>
  );
}
