// 02 — Projets.
import Section from '../components/Section.jsx';
import { SECTIONS, projects } from '../data/projects.js';
import { tr, useLang } from '../i18n/LanguageContext.jsx';

export default function Projects() {
  const { lang, t } = useLang();

  return (
    <Section {...SECTIONS[1]} index={1}>
      <h2 data-reveal className="font-display text-5xl uppercase leading-none sm:text-7xl">
        {t('projectsTitle')}
      </h2>

      <ul className="mt-12 border-t border-line">
        {projects.map((p) => {
          const name = tr(p.name, lang);
          return (
            // La clé reste stable quand la langue change (on prend le nom FR).
            <li
              key={tr(p.name, 'fr')}
              data-reveal
              className="grid gap-3 border-b border-line py-8 md:grid-cols-[1fr_1.2fr] md:gap-10"
            >
              <h3 className="text-2xl font-medium">
                {p.link ? (
                  <a href={p.link} target="_blank" rel="noreferrer" className="hover:text-accent">
                    {name} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  name
                )}
              </h3>
              <div>
                <p className="text-muted">{tr(p.description, lang)}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={t('technologies')}>
                  {p.stack.map((tech) => (
                    <li key={tech} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
