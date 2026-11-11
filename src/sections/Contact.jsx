// 05 — Outro : on redescend vers l'ambiance.
import Section from '../components/Section.jsx';
import { SECTIONS, contact } from '../data/projects.js';

export default function Contact() {
  const links = [
    { label: 'LinkedIn', href: contact.linkedin },
    { label: 'GitHub', href: contact.github },
    { label: 'CV (PDF)', href: contact.cv },
  ];

  return (
    <Section {...SECTIONS[4]} index={4}>
      <h2 data-reveal className="font-display text-5xl uppercase leading-none sm:text-7xl">
        On travaille
        <br />
        ensemble<span className="text-accent">?</span>
      </h2>

      <a
        data-reveal
        href={`mailto:${contact.email}`}
        className="mt-10 block w-fit break-all text-2xl underline decoration-line underline-offset-8 transition-colors hover:decoration-accent sm:text-4xl"
      >
        {contact.email}
      </a>

      <ul data-reveal className="mt-10 flex flex-wrap gap-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full border border-line px-5 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              {l.label} <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>

      <p data-reveal className="mt-24 text-xs text-muted">
        © {new Date().getFullYear()} Gesther Michel — Conçu et développé par moi.
      </p>
    </Section>
  );
}
