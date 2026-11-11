// =============================================================================
// MOTEUR AUDIO — un SINGLETON qui vit en dehors de React
// =============================================================================
// Pourquoi en dehors de React ?
// Un composant React peut être re-rendu (ou démonté puis remonté) à tout moment.
// Si les lecteurs audio vivaient dans un composant, ils risqueraient d'être
// recréés et le son se couperait. Ici, le module JavaScript n'est évalué
// qu'une seule fois : il n'existe donc qu'UNE instance du moteur pour tout le
// site (c'est le principe du singleton). Les composants l'importent et
// appellent ses fonctions, sans jamais le posséder.
//
// Schéma du signal :
//
//   ambiance ─┐
//   bass ─────┤                     ┌──> haut-parleurs (Tone.Destination)
//   drums ────┼──> Gain maître ─────┤
//   melody ───┘   (son on/off)      └──> Analyser FFT (64 bandes, pour le visuel)
//
// Chaque lecteur (Tone.Player) a son propre réglage de volume en décibels :
// c'est ce volume qu'on fait glisser pour changer le mixage selon la section.
// =============================================================================

// Les 4 pistes attendues dans public/audio/ (voir public/audio/LISEZ-MOI.txt).
const TRACKS = ['ambiance', 'bass', 'drums', 'melody'];

// MIXAGE PAR SECTION — c'est le tableau à modifier pour ajuster le morceau.
// Une ligne par section (dans l'ordre du site), un volume de 0 à 1 par piste.
export const SECTION_MIX = [
  /* 01 Intro    */ { ambiance: 1.0, bass: 0.0, drums: 0.0, melody: 0.0 },
  /* 02 Couplet  */ { ambiance: 0.8, bass: 0.8, drums: 0.4, melody: 0.0 },
  /* 03 Refrain  */ { ambiance: 1.0, bass: 1.0, drums: 1.0, melody: 1.0 },
  /* 04 Pont     */ { ambiance: 0.9, bass: 0.3, drums: 0.0, melody: 0.9 },
  /* 05 Outro    */ { ambiance: 0.7, bass: 0.0, drums: 0.0, melody: 0.15 },
];

const FADE_SECONDS = 1.5; // durée du fondu entre deux mixages
const FLOOR_DB = -60; // « silence » : -60 dB au lieu de -Infinity (voir toDb)
const MUTE_FADE = 0.3; // petit fondu pour couper/remettre le son sans clic

// --- État interne du module (privé : non exporté) ---------------------------
let Tone = null; // la bibliothèque, chargée à la demande (voir init)
let players = {}; // { ambiance: Tone.Player, ... } — seulement les pistes trouvées
let master = null; // Tone.Gain maître
let analyser = null; // Tone.Analyser en mode FFT
let currentSection = 0; // section active, mémorisée même avant le démarrage
let muted = true; // le son est coupé par défaut
let ready = false; // true quand au moins une piste joue
let initPromise = null; // évite de lancer init() deux fois en parallèle

// Convertit un volume linéaire (0 à 1) en décibels.
// On impose un plancher à -60 dB : un fondu vers -Infinity est impossible à
// calculer (la rampe ne « sait » pas où aller), alors que -60 dB est
// inaudible en pratique et donne une rampe propre.
function toDb(volume) {
  if (volume <= 0) return FLOOR_DB;
  return Math.max(FLOOR_DB, 20 * Math.log10(volume));
}

// Applique le mixage d'une section à toutes les pistes, avec un fondu.
function applyMix(index, seconds) {
  const mix = SECTION_MIX[index];
  if (!mix) return;
  for (const name of Object.keys(players)) {
    // rampTo fait glisser le paramètre jusqu'à la valeur cible en "seconds".
    players[name].volume.rampTo(toDb(mix[name] ?? 0), seconds);
  }
}

// Charge un fichier audio. Renvoie un objet Tone.ToneAudioBuffer, ou null si le
// fichier est introuvable ou illisible (on ne plante jamais à cause de ça).
async function loadTrack(name) {
  const url = `/audio/${name}.mp3`;
  try {
    const buffer = new Tone.ToneAudioBuffer();
    await buffer.load(url);
    return buffer;
  } catch (err) {
    console.warn(`[audio] Piste introuvable ou illisible : ${url}`, err);
    return null;
  }
}

// -----------------------------------------------------------------------------
// init() — À APPELER SEULEMENT APRÈS UN CLIC DE L'UTILISATEUR.
// Les navigateurs interdisent de jouer du son tant que la personne n'a pas
// interagi avec la page (règle « autoplay »). Tone.start() « réveille » le
// contexte Web Audio. Il doit être appelé pendant le gestionnaire du clic.
// Renvoie true si au moins une piste joue, false sinon.
// -----------------------------------------------------------------------------
export function init() {
  if (!initPromise) initPromise = doInit();
  return initPromise;
}

async function doInit() {
  try {
    // Import dynamique : Tone.js est assez lourd. Il n'est téléchargé que si
    // la personne active le son, ce qui garde le premier chargement léger.
    Tone = await import('tone');
    await Tone.start();

    // Création du gain maître (0 = muet) et de l'analyseur.
    master = new Tone.Gain(0).toDestination();
    analyser = new Tone.Analyser('fft', 64);
    master.connect(analyser);

    // Chargement des 4 pistes en parallèle. allSettled attend la fin de toutes
    // les promesses, qu'elles réussissent ou non.
    const results = await Promise.allSettled(TRACKS.map(loadTrack));

    results.forEach((result, i) => {
      const buffer = result.status === 'fulfilled' ? result.value : null;
      if (!buffer) return;
      const player = new Tone.Player(buffer);
      player.loop = true;
      player.volume.value = toDb(SECTION_MIX[currentSection][TRACKS[i]]);
      player.connect(master);
      players[TRACKS[i]] = player;
    });

    const names = Object.keys(players);
    if (names.length === 0) {
      console.warn('[audio] Aucune piste trouvée dans /audio/ : le site continue sans son.');
      return false;
    }

    // SYNCHRONISATION : toutes les pistes démarrent au MÊME instant précis,
    // un dixième de seconde dans le futur (le temps que tout soit prêt).
    // Comme elles ont la même durée et bouclent, elles restent alignées.
    const startAt = Tone.now() + 0.1;
    names.forEach((name) => players[name].start(startAt));

    ready = true;
    setMuted(muted); // applique l'état actuel du bouton son
    return true;
  } catch (err) {
    console.warn('[audio] Impossible de démarrer le son :', err);
    return false;
  }
}

// Change de section : fondu de 1,5 s vers le nouveau mixage.
export function setSection(index) {
  if (index === currentSection) return;
  currentSection = index;
  if (ready) applyMix(index, FADE_SECONDS);
}

// Coupe (true) ou remet (false) le son, via le gain maître.
export function setMuted(value) {
  muted = value;
  if (master) master.gain.rampTo(muted ? 0 : 1, MUTE_FADE);
}

// Le son est-il réellement en train de jouer ?
export function isPlaying() {
  return ready && !muted;
}

// Niveaux pour le visualiseur, appelé à chaque image (60 fois par seconde).
// Renvoie null s'il n'y a pas de son : le visualiseur prend alors le relais
// avec une animation calculée.
//   level : niveau global de 0 à 1
//   bass  : niveau des basses de 0 à 1 (les premières bandes FFT)
//   fft   : tableau de 64 valeurs de 0 à 1
export function getLevels() {
  if (!isPlaying() || !analyser) return null;

  // L'analyseur FFT donne des décibels (environ -100 à 0). On les ramène
  // entre 0 et 1 pour que le dessin soit simple.
  const raw = analyser.getValue();
  const fft = new Array(raw.length);
  let sum = 0;
  for (let i = 0; i < raw.length; i++) {
    const v = Math.min(1, Math.max(0, (raw[i] + 100) / 100));
    fft[i] = v;
    sum += v;
  }
  const bass = (fft[0] + fft[1] + fft[2] + fft[3]) / 4;
  return { level: sum / fft.length, bass, fft };
}
