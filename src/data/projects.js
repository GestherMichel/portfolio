// =============================================================================
// CONTENU DU SITE (français / anglais)
// =============================================================================
// Tout le contenu modifiable est ici, séparé des composants. Pour ajouter un
// projet ou changer une compétence, on touche seulement ce fichier.
//
// Chaque texte traduisible est un objet { fr: '…', en: '…' }. Les noms
// propres et les technologies restent de simples chaînes. Les composants
// lisent les deux formes avec tr(valeur, lang) (src/i18n/LanguageContext.jsx).
// =============================================================================

// Les 5 sections du site, dans l'ordre. L'index (0 à 4) correspond à la ligne
// de SECTION_MIX dans src/audio/audioEngine.js : en coulisses, chaque
// section reste une partie du morceau (Intro, Couplet, Refrain, Pont, Outro).
export const SECTIONS = [
  { id: 'intro', number: '01', label: { fr: 'Accueil', en: 'Home' } },
  { id: 'projets', number: '02', label: { fr: 'Projets', en: 'Projects' } },
  { id: 'moveout', number: '03', label: 'Moveout' },
  { id: 'competences', number: '04', label: { fr: 'Compétences', en: 'Skills' } },
  { id: 'contact', number: '05', label: 'Contact' },
];

export const featured = {
  name: 'Moveout',
  tagline: {
    fr: 'Plateforme de recherche de logements avec agent IA',
    en: 'Housing search platform powered by an AI agent',
  },
  period: '2025-2026',
  team: { fr: 'Équipe de 5', en: 'Team of 5' },
  site: 'https://www.moveout.ai',
  repo: 'https://github.com/thebenoit/Moveout_Project02',
  // Architecture de l'équipe (pas seulement ta contribution) — à vérifier.
  architecture: {
    fr: 'Chaque agent tourne dans sa propre image Docker, et les conteneurs communiquent entre eux, ce qui garde les services faiblement couplés.',
    en: 'Each agent runs in its own Docker image, and the containers communicate with each other, which keeps the services loosely coupled.',
  },
  stack: ['Python', 'FastAPI', 'OpenAI API', 'SSE', 'Docker', 'Vue 3', 'Tailwind'],
  contributions: [
    {
      fr: "Backend asynchrone de l'agent en Python/FastAPI avec l'API OpenAI.",
      en: "Asynchronous backend for the agent in Python/FastAPI with the OpenAI API.",
    },
    {
      fr: 'Streaming des réponses en temps réel par Server-Sent Events (SSE).',
      en: 'Real-time response streaming with Server-Sent Events (SSE).',
    },
    {
      fr: "Comptage des jetons par requête et gestion des erreurs et limites de l'API (quotas, nouvelles tentatives) pour contrôler les coûts.",
      en: 'Per-request token counting and API error and rate-limit handling (quotas, retries) to keep costs under control.',
    },
    {
      fr: "Refonte de la page d'accès anticipé en Vue 3 + Tailwind, avec deux composants d'animation.",
      en: 'Redesign of the early-access page in Vue 3 + Tailwind, with two animation components.',
    },
  ],
};

export const projects = [
  {
    name: { fr: 'Application mobile Android', en: 'Android mobile app' },
    description: {
      fr: 'Travail pratique : application native structurée selon MVC et les principes SOLID.',
      en: 'Course project: a native app structured with MVC and the SOLID principles.',
    },
    stack: ['Kotlin', 'Android', 'MVC', 'SOLID'],
    link: null,
  },
  {
    name: { fr: 'Ce portfolio', en: 'This portfolio' },
    description: {
      fr: 'Mon portfolio personnel, bilingue : une interface sombre et minimaliste, avec des animations au défilement et une navigation fluide.',
      en: 'My bilingual personal portfolio: a dark, minimalist interface with scroll animations and smooth navigation.',
    },
    stack: ['React', 'Vite', 'GSAP', 'Tailwind'],
    link: 'https://github.com/GestherMichel/portfolio',
  },
];

export const skills = [
  {
    group: { fr: 'Langages', en: 'Languages' },
    items: ['Python', 'Java', 'Kotlin', 'JavaScript', 'SQL', 'HTML/CSS'],
  },
  {
    group: { fr: 'Cadriciels', en: 'Frameworks' },
    items: ['React', 'Vue.js 3', 'FastAPI', 'Node.js/Express', 'Tailwind', 'Android (Kotlin)'],
  },
  {
    group: { fr: 'Données et outils', en: 'Data and tools' },
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Git/GitHub', 'Docker', 'Linux'],
  },
];

export const contact = {
  email: 'gesthermichel02@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gesther-michel-aaa76a36a/',
  github: 'https://github.com/GestherMichel',
  // Le CV suit la langue du site : français ou anglais.
  cv: { fr: '/Gesther_Michel_CV.pdf', en: '/Gesther_Michel_Resume.pdf' },
};
