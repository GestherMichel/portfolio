// =============================================================================
// CONTEXTE AUDIO (React)
// =============================================================================
// Un « contexte » React permet de partager une donnée avec n'importe quel
// composant de l'arbre, sans la passer de parent en enfant (props).
//
// Ici, le contexte ne contient PAS le son : le son vit dans audioEngine.js.
// Il contient seulement l'ÉTAT DE L'INTERFACE dont les composants ont besoin
// pour s'afficher :
//   - entered : la personne a-t-elle passé l'écran d'entrée ?
//   - muted   : le bouton « Son » est-il sur off ?
// et les actions qui modifient cet état (enter, toggleMute).
//
// Note : le nom du fichier n'a rien à voir avec l'objet AudioContext natif du
// navigateur (Web Audio). C'est le contexte React lié à l'audio.
// =============================================================================
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import * as audioEngine from './audioEngine.js';

const SoundContext = createContext(null);

export function AudioProvider({ children }) {
  const [entered, setEntered] = useState(false);
  const [muted, setMuted] = useState(true); // son coupé par défaut

  // Active le son. IMPORTANT : cette fonction doit être appelée directement
  // depuis un clic, sinon le navigateur refuse de démarrer l'audio.
  const startSound = useCallback(async () => {
    setMuted(false);
    audioEngine.setMuted(false);
    const ok = await audioEngine.init();
    // Si aucune piste n'a été trouvée, on remet le bouton sur « off ».
    if (!ok) {
      setMuted(true);
      audioEngine.setMuted(true);
    }
  }, []);

  // Appelée par l'écran d'entrée.
  const enter = useCallback(
    (withSound) => {
      setEntered(true);
      if (withSound) startSound();
    },
    [startSound],
  );

  // Appelée par le bouton « Son : on/off » de la navigation.
  const toggleMute = useCallback(() => {
    if (muted) {
      startSound(); // init() ne fait rien s'il a déjà été appelé
    } else {
      setMuted(true);
      audioEngine.setMuted(true);
    }
  }, [muted, startSound]);

  // useMemo évite de recréer l'objet à chaque rendu (sinon tous les
  // composants qui lisent le contexte se re-rendraient pour rien).
  const value = useMemo(
    () => ({ entered, muted, enter, toggleMute }),
    [entered, muted, enter, toggleMute],
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

// Petit hook pratique : const { muted, toggleMute } = useAudio();
export function useAudio() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useAudio doit être utilisé dans <AudioProvider>.');
  return ctx;
}
