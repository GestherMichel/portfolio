// =============================================================================
// APP — assemble toutes les pièces
// =============================================================================
// L'ordre d'empilement (z-index) :
//   z-0  Visualizer (fond animé)
//   z-10 contenu (sections)
//   z-40 navigation
//   z-50 écran d'entrée
// =============================================================================
import { AudioProvider, useAudio } from './audio/AudioContext.jsx';
import { useLenis } from './hooks/useLenis.js';
import EntryScreen from './components/EntryScreen.jsx';
import Nav from './components/Nav.jsx';
import Visualizer from './components/Visualizer.jsx';
import Intro from './sections/Intro.jsx';
import Projects from './sections/Projects.jsx';
import Featured from './sections/Featured.jsx';
import Skills from './sections/Skills.jsx';
import Contact from './sections/Contact.jsx';

// Composant interne : il doit être DANS <AudioProvider> pour lire le contexte.
function Site() {
  const { entered } = useAudio();

  // Défilement fluide, bloqué tant que l'écran d'entrée est affiché.
  useLenis(!entered);

  return (
    <>
      <EntryScreen />
      <Visualizer />
      <Nav />
      <main className="relative z-10">
        <Intro />
        <Projects />
        <Featured />
        <Skills />
        <Contact />
      </main>
    </>
  );
}

export default function App() {
  return (
    <AudioProvider>
      <Site />
    </AudioProvider>
  );
}
