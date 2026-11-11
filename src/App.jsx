// Version provisoire : affiche les cinq sections avec le défilement fluide.
// L'écran d'entrée, la navigation et le visualiseur viendront ensuite.
import { AudioProvider } from './audio/AudioContext.jsx';
import { useLenis } from './hooks/useLenis.js';
import Intro from './sections/Intro.jsx';
import Projects from './sections/Projects.jsx';
import Featured from './sections/Featured.jsx';
import Skills from './sections/Skills.jsx';
import Contact from './sections/Contact.jsx';

function Site() {
  // Défilement fluide toujours actif (pas encore d'écran d'entrée).
  useLenis(false);

  return (
    <main className="relative z-10">
      <Intro />
      <Projects />
      <Featured />
      <Skills />
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <AudioProvider>
      <Site />
    </AudioProvider>
  );
}
