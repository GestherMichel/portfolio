// =============================================================================
// TEXTES DE L'INTERFACE (français / anglais)
// =============================================================================
// Une clé par texte, avec sa version française et anglaise.
// Dans un composant : const { t } = useLang();  puis  t('seeProjects')
// =============================================================================
export const UI = {
  // Page (titre de l'onglet et description pour Google)
  pageTitle: {
    fr: 'Gesther Michel — Développeur logiciel et Web',
    en: 'Gesther Michel — Software and Web Developer',
  },
  pageDescription: {
    fr: "Portfolio de Gesther Michel, finissant en Techniques de l'informatique à Montréal. À la recherche d'un stage en développement logiciel et Web, hiver 2027.",
    en: 'Portfolio of Gesther Michel, graduating Computer Science Technology student in Montreal. Looking for a software and web development internship, Winter 2027.',
  },

  // Navigation
  navLabel: { fr: 'Navigation principale', en: 'Main navigation' },
  backToTop: { fr: 'Retour au début', en: 'Back to top' },
  sound: { fr: 'Son', en: 'Sound' },
  soundOn: { fr: 'Activer le son', en: 'Turn sound on' },
  soundOff: { fr: 'Couper le son', en: 'Turn sound off' },
  switchLang: { fr: 'Switch to English', en: 'Passer en français' },

  // Accueil
  role: {
    fr: "Développeur logiciel et Web. Finissant en Techniques de l'informatique (génie logiciel) au Collège de Bois-de-Boulogne, à Montréal.",
    en: 'Software and web developer. Graduating Computer Science Technology student (software engineering) at Collège de Bois-de-Boulogne, Montreal.',
  },
  lookingBefore: { fr: 'Je cherche un ', en: "I'm looking for an " },
  lookingWord: { fr: 'stage', en: 'internship' },
  lookingAfter: {
    fr: " pour l'hiver 2027 (19 janvier au 30 avril).",
    en: ' for Winter 2027 (January 19 to April 30).',
  },
  musicInvite: { fr: "Musique pour l'ambiance du site.", en: 'Background music for the site.' },
  seeProjects: { fr: 'Voir mes projets', en: 'See my projects' },

  // Projets et Moveout
  projectsTitle: { fr: 'Projets', en: 'Projects' },
  technologies: { fr: 'Technologies', en: 'Technologies' },
  myContribution: { fr: 'Ma contribution', en: 'My contribution' },
  seeCode: { fr: 'Voir le code sur GitHub', en: 'View the code on GitHub' },
  seeSite: { fr: 'Voir le site', en: 'Visit the site' },

  // Compétences
  skillsTitle: { fr: 'Compétences', en: 'Skills' },

  // Contact
  contactTitle1: { fr: 'On travaille', en: "Let's work" },
  contactTitle2: { fr: 'ensemble', en: 'together' },
  cv: { fr: 'CV (PDF)', en: 'Resume (PDF)' },
  footer: { fr: 'Conçu et développé par moi.', en: 'Designed and built by me.' },
};
