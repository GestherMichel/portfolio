# Portfolio — Gesther Michel

> **Le site est un morceau.** Le portfolio se parcourt comme une chanson que j'ai composée dans FL Studio. Chaque section est une partie du morceau, et le défilement fait évoluer le mixage.

| Section | Partie du morceau | Pistes entendues |
| --- | --- | --- |
| 01 Intro (accueil) | Intro | ambiance |
| 02 Couplet (projets) | Couplet | ambiance, basse, un peu de batterie |
| 03 Refrain (Moveout) | Refrain | tout le morceau |
| 04 Pont (compétences) | Pont | ambiance, mélodie, un peu de basse |
| 05 Outro (contact) | Outro | retour vers l'ambiance |

Le son est **coupé par défaut** et le site est complet sans lui.

## Technologies

- **React 18 + Vite** : interface et outil de compilation
- **Tailwind CSS 3** : styles utilitaires
- **GSAP + ScrollTrigger + @gsap/react** : animations au défilement
- **Lenis** : défilement fluide, synchronisé avec le ticker de GSAP
- **Tone.js** : lecture et mixage des 4 pistes audio (Web Audio)
- **Vercel** : hébergement

## Commandes

```bash
npm install      # installe les dépendances
npm run dev      # serveur de développement : http://localhost:5173
npm run build    # compile le site dans dist/
npm run preview  # sert le dossier dist/ pour le tester
```

## Structure

```
public/
  audio/                 ambiance.mp3, bass.mp3, drums.mp3, melody.mp3 (voir LISEZ-MOI.txt)
  Gesther_Michel_CV.pdf  le CV téléchargeable
src/
  audio/audioEngine.js   moteur audio (singleton hors React) et tableau SECTION_MIX
  audio/AudioContext.jsx contexte React : état « entré » et « son on/off »
  hooks/useLenis.js      défilement fluide + blocage pendant l'écran d'entrée
  components/            EntryScreen, Nav, Section, Visualizer
  sections/              Intro, Projects, Featured, Skills, Contact
  data/projects.js       tout le texte du site
  utils/motion.js        détection de prefers-reduced-motion
```

## Modifier le mixage

Ouvre `src/audio/audioEngine.js` et ajuste `SECTION_MIX` : une ligne par section, un volume de 0 à 1 par piste.

## Changer la couleur d'accent

Dans `src/index.css`, modifie `--accent` (format `R G B`).
