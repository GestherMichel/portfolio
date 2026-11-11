// Version provisoire : l'application est enveloppée dans AudioProvider
// pour que les futurs composants puissent lire le contexte audio.
import { AudioProvider } from './audio/AudioContext.jsx';

export default function App() {
  return (
    <AudioProvider>
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-4xl font-bold">Portfolio</h1>
      </main>
    </AudioProvider>
  );
}
