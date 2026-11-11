// =============================================================================
// APP — assemble toutes les pièces
// =============================================================================
// On arrive directement sur l'accueil : pas d'écran d'entrée. Le son est un
// bonus, coupé par défaut, qu'on active depuis l'accueil ou le menu.
//
// L'ordre d'empilement (z-index) :
//   z-0  Visualizer (fond animé)
//   z-10 contenu (sections)
//   z-40 navigation
// =============================================================================
import { AudioProvider } from './audio/AudioContext.jsx';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import { useLenis } from './hooks/useLenis.js';
import Nav from './components/Nav.jsx';
import Visualizer from './components/Visualizer.jsx';
import Intro from './sections/Intro.jsx';
import Projects from './sections/Projects.jsx';
import Featured from './sections/Featured.jsx';
import Skills from './sections/Skills.jsx';
import Contact from './sections/Contact.jsx';

export default function App() {
  // Défilement fluide pour tout le site.
  useLenis();

  // Deux contextes imbriqués : la langue et le son. Tous les composants à
  // l'intérieur peuvent lire l'un ou l'autre (useLang, useAudio).
  return (
    <LanguageProvider>
      <AudioProvider>
        <Visualizer />
        <Nav />
        <main className="relative z-10">
          <Intro />
          <Projects />
          <Featured />
          <Skills />
          <Contact />
        </main>
      </AudioProvider>
    </LanguageProvider>
  );
}
