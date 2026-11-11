# Portfolio — Gesther Michel

Portfolio de développeur logiciel et Web, **en français et en anglais** (bouton FR / EN dans le menu). On arrive directement sur l'accueil, avec mon profil et mes projets.

**Le bonus : la musique.** J'ai composé la musique du site dans FL Studio. Si on active le son (sur l'accueil ou dans le menu), le morceau évolue au fil du défilement : chaque section correspond à une partie de la chanson.

| Section | Partie du morceau | Pistes entendues |
| --- | --- | --- |
| 01 Accueil | Intro | l'ambiance en avant, un soupçon de basse |
| 02 Projets | Couplet | l'ambiance en avant, basse et batterie très bas |
| 03 Moveout | Refrain | tout le morceau, l'ambiance largement en avant |
| 04 Compétences | Pont | l'ambiance en avant, mélodie à mi-volume |
| 05 Contact | Outro | l'ambiance seule, une trace de mélodie |

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
  favicon.svg            l'icône de l'onglet
  og-image.png           l'image d'aperçu quand on partage le lien
src/
  audio/audioEngine.js   moteur audio (singleton hors React) et tableau SECTION_MIX
  audio/AudioContext.jsx contexte React : état « son on/off »
  i18n/LanguageContext.jsx contexte React : langue active (fr / en), mémorisée
  i18n/ui.js             textes de l'interface en français et en anglais
  hooks/useLenis.js      défilement fluide synchronisé avec GSAP
  components/            Nav, Section, Visualizer
  sections/              Intro, Projects, Featured, Skills, Contact
  data/projects.js       tout le contenu du site, en { fr, en }
  utils/motion.js        détection de prefers-reduced-motion
```

## Modifier un texte

- Contenu (projets, compétences, contact) : `src/data/projects.js`
- Interface (menu, boutons, titres) : `src/i18n/ui.js`

Chaque texte existe en deux versions : `{ fr: '…', en: '…' }`.

## Modifier le mixage

Ouvre `src/audio/audioEngine.js` et ajuste `SECTION_MIX` : une ligne par section, un volume de 0 à 1 par piste.

## Changer la couleur d'accent

Dans `src/index.css`, modifie `--accent` (format `R G B`).
