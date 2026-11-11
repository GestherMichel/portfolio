// 04 — Compétences.
import Section from '../components/Section.jsx';
import { SECTIONS, skills } from '../data/projects.js';
import { tr, useLang } from '../i18n/LanguageContext.jsx';

export default function Skills() {
  const { lang, t } = useLang();

  return (
    <Section {...SECTIONS[3]} index={3}>
      <h2 data-reveal className="font-display text-5xl uppercase leading-none sm:text-7xl">
        {t('skillsTitle')}
      </h2>

      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s) => (
          <div key={tr(s.group, 'fr')} data-reveal className="border-t border-line pt-6">
            <h3 className="text-sm uppercase tracking-[0.2em] text-accent">{tr(s.group, lang)}</h3>
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
