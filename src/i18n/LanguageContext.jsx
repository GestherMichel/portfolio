// =============================================================================
// LANGUE DU SITE (français / anglais) — sans bibliothèque
// =============================================================================
// Même principe que le contexte audio : un contexte React partage la langue
// active avec tous les composants. Quand on change de langue, React re-rend
// les composants qui lisent le contexte, et tous les textes changent.
//
// Deux sortes de textes :
//  - les textes de l'INTERFACE (boutons, menu…) sont dans src/i18n/ui.js
//    et se lisent avec t('cle') ;
//  - le CONTENU (projets, compétences…) est dans src/data/projects.js, où
//    chaque texte est un objet { fr, en } qu'on lit avec tr(valeur).
// =============================================================================
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { UI } from './ui.js';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'gesther-portfolio-langue'; // valeur : 'fr' ou 'en'

// Langue de départ : le choix mémorisé, sinon la langue du navigateur.
// Le français est la langue par défaut.
function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'fr' || saved === 'en') return saved;
  } catch {
    // localStorage inaccessible (navigation privée…) : on continue
  }
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'fr';
}

// Lit un texte de contenu : un objet { fr, en } ou une simple chaîne
// (les noms propres et les technologies ne se traduisent pas).
export function tr(value, lang) {
  if (typeof value === 'string') return value;
  return value?.[lang] ?? value?.fr ?? '';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  const toggleLang = useCallback(() => {
    setLang((current) => {
      const next = current === 'fr' ? 'en' : 'fr';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // pas grave : le choix ne sera juste pas mémorisé
      }
      return next;
    });
  }, []);

  // t('cle') : texte de l'interface dans la langue active.
  const t = useCallback((key) => tr(UI[key], lang), [lang]);

  // Met à jour ce qui est en dehors de React : la langue de la page
  // (utile aux lecteurs d'écran et à Google), le titre de l'onglet et la
  // description.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = tr(UI.pageTitle, lang);
    document.querySelector('meta[name="description"]')?.setAttribute('content', tr(UI.pageDescription, lang));
  }, [lang]);

  const value = useMemo(() => ({ lang, toggleLang, t }), [lang, toggleLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// const { lang, toggleLang, t } = useLang();
export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang doit être utilisé dans <LanguageProvider>.');
  return ctx;
}
