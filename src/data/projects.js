// =============================================================================
// CONTENU DU SITE
// =============================================================================
// Tout le texte modifiable est ici, séparé des composants. Pour ajouter un
// projet ou changer une compétence, on touche seulement ce fichier.
// =============================================================================

// Les 5 sections du site, dans l'ordre. Le nom affiché (label) décrit
// l'endroit où on est dans le site. L'index (0 à 4) correspond à la ligne
// de SECTION_MIX dans src/audio/audioEngine.js : en coulisses, chaque
// section reste une partie du morceau (Intro, Couplet, Refrain, Pont, Outro).
export const SECTIONS = [
  { id: 'intro', number: '01', label: 'Accueil' }, 
  { id: 'projets', number: '02', label: 'Projets' }, 
  { id: 'moveout', number: '03', label: 'Moveout' }, 
  { id: 'competences', number: '04', label: 'Compétences' }, 
  { id: 'contact', number: '05', label: 'Contact' }, 
];

export const featured = {
  name: 'Moveout',
  tagline: 'Plateforme de recherche de logements avec agent IA',
  period: '2025-2026',
  team: 'Équipe de 5',
  repo: 'https://github.com/thebenoit/Moveout_Project02',
  
  architecture:
    'Chaque agent tourne dans sa propre image Docker, et les conteneurs communiquent entre eux, ce qui garde les services faiblement couplés.',
  stack: ['Python', 'FastAPI', 'API OpenAI', 'SSE', 'Docker', 'Vue 3', 'Tailwind'],
  contributions: [
    "Backend asynchrone de l'agent en Python/FastAPI avec l'API OpenAI.",
    'Streaming des réponses en temps réel par Server-Sent Events (SSE).',
    'Comptage des jetons et gestion des quotas par utilisateur.',
    "Refonte de la page d'accès anticipé en Vue 3 + Tailwind, avec deux composants d'animation.",
  ],
};

export const projects = [
  {
    name: 'Application mobile Android',
    description: 'Travail pratique : application native structurée selon MVC et les principes SOLID.',
    stack: ['Java', 'Android', 'MVC', 'SOLID'],
    link: null,
  },
  {
    
    name: 'Portfolio Web',
    description: 'Projet de cours : un portfolio en React.',
    stack: ['React'],
    link: null,
  },
  {
    name: 'Ce portfolio',
    description:
      'Mon portfolio personnel : une interface sombre et minimaliste, avec des animations au défilement et une navigation fluide.',
    stack: ['React', 'Vite', 'GSAP', 'Tailwind'],
    link: 'https://github.com/GestherMichel',
  },
];

export const skills = [
  { group: 'Langages', items: ['Python', 'Java', 'JavaScript', 'SQL', 'HTML/CSS'] },
  {
    group: 'Cadriciels',
    items: ['React', 'Vue.js 3', 'FastAPI', 'Node.js/Express', 'Tailwind', 'Android'],
  },
  {
    group: 'Données et outils',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Git/GitHub', 'Docker', 'Linux'],
  },];

export const contact = {
  email: 'gesthermichel02@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gesther-michel-aaa76a36a/',
  github: 'https://github.com/GestherMichel',
  cv: '/Gesther_Michel_CV.pdf',
};
