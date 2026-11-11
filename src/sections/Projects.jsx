// 02 — Couplet : on ajoute la basse et un peu de batterie.
import Section from '../components/Section.jsx';
import { SECTIONS, projects } from '../data/projects.js';

export default function Projects() {
  return (
    <Section {...SECTIONS[1]} index={1}>
      <h2 data-reveal className="font-display text-5xl uppercase leading-none sm:text-7xl">
        Projets
      </h2>

      <ul className="mt-12 border-t border-line">
        {projects.map((p) => (
          <li
            key={p.name}
            data-reveal
            className="grid gap-3 border-b border-line py-8 md:grid-cols-[1fr_1.2fr] md:gap-10"
          >
            <h3 className="text-2xl font-medium">
              {p.link ? (
                <a href={p.link} target="_blank" rel="noreferrer" className="hover:text-accent">
                  {p.name} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                p.name
              )}
            </h3>
            <div>
              <p className="text-muted">{p.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                {p.stack.map((tech) => (
                  <li key={tech} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
