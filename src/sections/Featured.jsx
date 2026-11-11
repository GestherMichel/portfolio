// 03 — Refrain : tout le morceau joue. Le projet phare, Moveout.
import Section from '../components/Section.jsx';
import { SECTIONS, featured } from '../data/projects.js';

export default function Featured() {
  return (
    <Section {...SECTIONS[2]} index={2}>
      <h2 data-reveal className="font-display text-[18vw] uppercase leading-[0.85] text-accent sm:text-[12vw] lg:text-[11rem]">
        {featured.name}
      </h2>
      <p data-reveal className="mt-6 max-w-2xl text-xl sm:text-2xl">
        {featured.tagline}
      </p>
      <p data-reveal className="mt-3 text-sm uppercase tracking-[0.2em] text-muted">
        {featured.team} · {featured.period}
      </p>

      <div className="mt-14 grid gap-10 md:grid-cols-[1fr_2fr]">
        <h3 data-reveal className="text-sm uppercase tracking-[0.2em] text-muted">
          Ma contribution
        </h3>
        <ol className="space-y-6">
          {featured.contributions.map((c, i) => (
            <li key={c} data-reveal className="flex gap-5 border-b border-line pb-6">
              <span className="font-display text-accent">{String(i + 1).padStart(2, '0')}</span>
              <span>{c}</span>
            </li>
          ))}
        </ol>
      </div>

      <div data-reveal className="mt-12 flex flex-wrap items-center gap-6">
        <ul className="flex flex-wrap gap-2" aria-label="Technologies">
          {featured.stack.map((tech) => (
            <li key={tech} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
              {tech}
            </li>
          ))}
        </ul>
        <a
          href={featured.repo}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-105"
        >
          Voir le code sur GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
    </Section>
  );
}
