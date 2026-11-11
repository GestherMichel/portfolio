// 01 — Accueil : la première chose qu'un recruteur voit.
// Le son est proposé en bonus, discrètement, sous le texte.
import Section from '../components/Section.jsx';
import { SECTIONS } from '../data/projects.js';
import { scrollToTarget } from '../hooks/useLenis.js';
import { useAudio } from '../audio/AudioContext.jsx';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function Intro() {
  const { muted, toggleMute } = useAudio();
  const { t } = useLang();

  return (
    <Section {...SECTIONS[0]} index={0}>
      {/* h1 : le titre principal de la page (important pour l'accessibilité et le SEO) */}
      <h1 data-reveal className="font-display text-[15vw] uppercase leading-[0.9] sm:text-[10vw] lg:text-[9rem]">
        Gesther
        <br />
        Michel<span className="text-accent">.</span>
      </h1>
      <p data-reveal className="mt-8 max-w-xl text-lg text-muted sm:text-xl">
        {t('role')}
      </p>
      <p data-reveal className="mt-4 max-w-xl text-paper">
        {t('lookingBefore')}
        <span className="text-accent">{t('lookingWord')}</span>
        {t('lookingAfter')}
      </p>

      {/* L'invitation au son. Le clic sur ce bouton suffit pour que le
          navigateur autorise l'audio : pas besoin d'écran d'entrée. */}
      <button
        data-reveal
        type="button"
        data-sound-toggle // repère utilisé par AudioContext.jsx
        onClick={toggleMute}
        aria-pressed={!muted}
        className="group mt-10 flex w-fit items-center gap-3 text-left text-sm text-muted transition-colors hover:text-paper"
      >
        <span aria-hidden="true" className="text-lg">🎧</span>
        <span>
          {t('musicInvite')}{' '}
          <span className="text-accent underline decoration-accent/40 underline-offset-4 group-hover:decoration-accent">
            {muted ? t('soundOn') : t('soundOff')}
          </span>
        </span>
      </button>

      <a
        data-reveal
        href="#projets"
        onClick={(e) => {
          e.preventDefault();
          scrollToTarget('#projets');
        }}
        className="mt-12 inline-flex w-fit items-center gap-3 text-sm uppercase tracking-[0.2em] text-muted transition-colors hover:text-paper"
      >
        {t('seeProjects')} <span aria-hidden="true">↓</span>
      </a>
    </Section>
  );
}
