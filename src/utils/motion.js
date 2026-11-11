// La personne a-t-elle demandé à son système de réduire les animations ?
// (Réglage d'accessibilité dans Windows, macOS, iOS, Android.)
// Si oui : pas de défilement fluide, pas d'apparitions animées, visuel figé.
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
