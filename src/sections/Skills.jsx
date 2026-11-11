// 04 — Pont : ambiance + mélodie, un peu de basse.
import Section from '../components/Section.jsx';
import { SECTIONS, skills } from '../data/projects.js';

export default function Skills() {
  return (
    <Section {...SECTIONS[3]} index={3}>
      <h2 data-reveal className="font-display text-5xl uppercase leading-none sm:text-7xl">
        Compétences
      </h2>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        {skills.map((s) => (
          <div key={s.group} data-reveal className="border-t border-line pt-6">
            <h3 className="text-sm uppercase tracking-[0.2em] text-accent">{s.group}</h3>
            <ul className="mt-4 space-y-1 text-2xl">
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
