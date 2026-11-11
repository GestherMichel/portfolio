// =============================================================================
// NAVIGATION FIXE
// =============================================================================
// Toujours visible en haut : logo, liens vers les 5 sections, bouton son.
// Sur mobile, on affiche seulement les numéros (01, 02…) pour gagner de la
// place ; les noms apparaissent à partir de l'écran « md » (768 px).
// =============================================================================
import { useAudio } from '../audio/AudioContext.jsx';
import { scrollToTarget } from '../hooks/useLenis.js';
import { SECTIONS } from '../data/projects.js';

export default function Nav() {
  const { muted, toggleMute } = useAudio();

  // On intercepte le clic pour défiler avec Lenis au lieu du saut natif.
  // Le href reste là : le lien fonctionne même si le JavaScript plante.
  const handleClick = (event, id) => {
    event.preventDefault();
    scrollToTarget(`#${id}`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-ink via-ink/80 to-transparent">
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-8"
      >
        <a
          href="#intro"
          onClick={(e) => handleClick(e, 'intro')}
          className="font-display text-2xl tracking-wide"
          aria-label="Retour au début"
        >
          gesther<span className="text-accent">.</span>
        </a>

        <ul className="flex items-center gap-3 text-xs sm:gap-5 sm:text-sm">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => handleClick(e, s.id)}
                className="text-muted transition-colors hover:text-paper"
              >
                <span className="text-accent">{s.number}</span>
                <span className="hidden md:inline"> {s.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          data-sound-toggle // repère utilisé par AudioContext.jsx
          onClick={toggleMute}
          aria-pressed={!muted}
          aria-label={muted ? 'Activer le son' : 'Couper le son'}
          className="shrink-0 rounded-full border border-line px-3 py-1.5 text-xs transition-colors hover:border-paper"
        >
          Son : <span className={muted ? 'text-muted' : 'text-accent'}>{muted ? 'off' : 'on'}</span>
        </button>
      </nav>
    </header>
  );
}
