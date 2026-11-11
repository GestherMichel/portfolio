// =============================================================================
// CONTEXTE AUDIO (React)
// =============================================================================
// Un « contexte » React permet de partager une donnée avec n'importe quel
// composant de l'arbre, sans la passer de parent en enfant (props).
//
// Ici, le contexte ne contient PAS le son : le son vit dans audioEngine.js.
// Il contient seulement l'ÉTAT DE L'INTERFACE dont les composants ont besoin
// pour s'afficher :
//   - muted : le son est-il coupé ? (oui par défaut)
// et l'action qui le modifie (toggleMute). Le bouton du menu et l'invitation
// de l'accueil utilisent tous les deux ce même état : ils restent synchronisés.
//
// Note : le nom du fichier n'a rien à voir avec l'objet AudioContext natif du
// navigateur (Web Audio). C'est le contexte React lié à l'audio.
// =============================================================================
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as audioEngine from './audioEngine.js';

const SoundContext = createContext(null);

// --- Mémoriser le choix entre deux visites -----------------------------------
// localStorage garde une petite valeur dans le navigateur de la personne,
// même après fermeture de l'onglet. On l'entoure de try/catch : en navigation
// privée, ou si les cookies sont bloqués, il peut être inaccessible. Dans ce
// cas, on fait simplement comme si aucun choix n'avait été fait.
const STORAGE_KEY = 'gesther-portfolio-son'; // valeur : 'on' ou 'off'

function readSoundChoice() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveSoundChoice(choice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // pas grave : le choix ne sera juste pas mémorisé
  }
}

export function AudioProvider({ children }) {
  const [muted, setMuted] = useState(true); // son coupé par défaut

  // Active le son. IMPORTANT : cette fonction doit être appelée directement
  // depuis un clic, sinon le navigateur refuse de démarrer l'audio.
  const startSound = useCallback(async () => {
    setMuted(false);
    audioEngine.setMuted(false);
    const ok = await audioEngine.init(); // ne fait rien s'il a déjà été appelé
    if (ok) {
      saveSoundChoice('on');
    } else {
      // Aucune piste trouvée : on remet le bouton sur « off ».
      setMuted(true);
      audioEngine.setMuted(true);
    }
  }, []);

  // Appelée par le bouton « Son » du menu et par l'invitation de l'accueil.
  const toggleMute = useCallback(() => {
    if (muted) {
      startSound();
    } else {
      setMuted(true);
      audioEngine.setMuted(true);
      saveSoundChoice('off');
    }
  }, [muted, startSound]);

  // RETOUR D'UN VISITEUR QUI AVAIT ACTIVÉ LE SON
  // Le navigateur interdit de lancer le son tout seul au chargement. On attend
  // donc la PREMIÈRE interaction (clic, toucher ou touche du clavier) n'importe
  // où dans la page, et on relance le son à ce moment-là.
  useEffect(() => {
    if (readSoundChoice() !== 'on') return;

    function onFirstInteraction(event) {
      // Si ce premier clic vise un bouton son, on laisse ce bouton faire son
      // travail (sinon on activerait le son, puis le bouton le couperait).
      removeListeners();
      if (event.target.closest?.('[data-sound-toggle]')) return;
      startSound();
    }
    function removeListeners() {
      window.removeEventListener('pointerdown', onFirstInteraction);
      window.removeEventListener('keydown', onFirstInteraction);
    }

    window.addEventListener('pointerdown', onFirstInteraction);
    window.addEventListener('keydown', onFirstInteraction);
    return removeListeners; // nettoyage si le composant disparaît
  }, [startSound]);

  // useMemo évite de recréer l'objet à chaque rendu (sinon tous les
  // composants qui lisent le contexte se re-rendraient pour rien).
  const value = useMemo(() => ({ muted, toggleMute }), [muted, toggleMute]);

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

// Petit hook pratique : const { muted, toggleMute } = useAudio();
export function useAudio() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useAudio doit être utilisé dans <AudioProvider>.');
  return ctx;
}
