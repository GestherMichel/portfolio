// =============================================================================
// NAVIGATION FIXE
// =============================================================================
// Toujours visible en haut : logo, liens vers les 5 sections, boutons
// FR/EN et Son.
//  - Mobile (< 768 px) : deux lignes. En haut, le logo et les boutons ; en
//    dessous, les 5 liens AVEC leur nom, dans une rangée qui défile à
//    l'horizontale si elle est trop large (la page, elle, ne défile pas).
//  - Ordinateur (≥ 768 px) : tout sur une seule ligne.
// =============================================================================
import { useAudio } from '../audio/AudioContext.jsx';
import { tr, useLang } from '../i18n/LanguageContext.jsx';
import { scrollToTarget } from '../hooks/useLenis.js';
import { SECTIONS } from '../data/projects.js';

export default function Nav() {
  const { muted, toggleMute } = useAudio();
  const { lang, toggleLang, t } = useLang();

  // On intercepte le clic pour défiler avec Lenis au lieu du saut natif.
  // Le href reste là : le lien fonctionne même si le JavaScript plante.
  const handleClick = (event, id) => {
    event.preventDefault();
    scrollToTarget(`#${id}`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-ink via-ink/90 to-transparent">
      <nav
        aria-label={t('navLabel')}
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-4 sm:px-8 md:flex-nowrap"
      >
        <a
          href="#intro"
          onClick={(e) => handleClick(e, 'intro')}
          className="font-display text-2xl tracking-wide"
          aria-label={t('backToTop')}
        >
          gesther<span className="text-accent">.</span>
        </a>

        {/* order : sur mobile, les liens passent en 2e ligne (order-last),
            sur ordinateur ils reviennent au milieu (md:order-none). */}
        <ul className="no-scrollbar order-last -mx-4 flex w-[calc(100%+2rem)] gap-5 overflow-x-auto px-4 text-sm md:order-none md:gap-4 md:text-xs lg:gap-5 lg:text-sm md:mx-0 md:w-auto md:overflow-visible md:px-0">
          {SECTIONS.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                onClick={(e) => handleClick(e, s.id)}
                className="text-muted transition-colors hover:text-paper"
              >
                <span className="text-accent">{s.number}</span> {tr(s.label, lang)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          {/* Bouton de langue : affiche la langue vers laquelle on bascule. */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t('switchLang')}
            className="rounded-full border border-line px-3 py-1.5 text-xs transition-colors hover:border-paper"
          >
            <span className={lang === 'fr' ? 'text-paper' : 'text-muted'}>FR</span>
            <span className="text-muted"> / </span>
            <span className={lang === 'en' ? 'text-paper' : 'text-muted'}>EN</span>
          </button>

          <button
            type="button"
            data-sound-toggle // repère utilisé par AudioContext.jsx
            onClick={toggleMute}
            aria-pressed={!muted}
            aria-label={muted ? t('soundOn') : t('soundOff')}
            className="rounded-full border border-line px-3 py-1.5 text-xs transition-colors hover:border-paper"
          >
            {t('sound')} : <span className={muted ? 'text-muted' : 'text-accent'}>{muted ? 'off' : 'on'}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
