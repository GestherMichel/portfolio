// 03 — Moveout : le projet phare.
import Section from '../components/Section.jsx';
import { SECTIONS, featured } from '../data/projects.js';
import { tr, useLang } from '../i18n/LanguageContext.jsx';

export default function Featured() {
  const { lang, t } = useLang();

  return (
    <Section {...SECTIONS[2]} index={2}>
      <h2 data-reveal className="font-display text-[18vw] uppercase leading-[0.85] text-accent sm:text-[12vw] lg:text-[11rem]">
        {featured.name}
      </h2>
      <p data-reveal className="mt-6 max-w-2xl text-xl sm:text-2xl">
        {tr(featured.tagline, lang)}
      </p>
      <p data-reveal className="mt-3 text-sm uppercase tracking-[0.2em] text-muted">
        {tr(featured.team, lang)} · {featured.period}
      </p>
      {/* L'architecture du projet (le travail de toute l'équipe) */}
      <p data-reveal className="mt-6 max-w-2xl text-muted">
        {tr(featured.architecture, lang)}
      </p>

      <div className="mt-14 grid gap-10 md:grid-cols-[1fr_2fr]">
        <h3 data-reveal className="text-sm uppercase tracking-[0.2em] text-muted">
          {t('myContribution')}
        </h3>
        <ol className="space-y-6">
          {featured.contributions.map((c, i) => (
            <li key={i} data-reveal className="flex gap-5 border-b border-line pb-6">
              <span className="font-display text-accent">{String(i + 1).padStart(2, '0')}</span>
              <span>{tr(c, lang)}</span>
            </li>
          ))}
        </ol>
      </div>

      <ul data-reveal className="mt-12 flex flex-wrap gap-2" aria-label={t('technologies')}>
        {featured.stack.map((tech) => (
          <li key={tech} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
            {tech}
          </li>
        ))}
      </ul>

      {/* Deux liens : le site en ligne (action principale) et le code. */}
      <div data-reveal className="mt-8 flex flex-wrap gap-3">
        <a
          href={featured.site}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-105"
        >
          {t('seeSite')} <span aria-hidden="true">↗</span>
        </a>
        <a
          href={featured.repo}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-line px-6 py-3 text-sm transition-colors hover:border-paper"
        >
          {t('seeCode')} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </Section>
  );
}
