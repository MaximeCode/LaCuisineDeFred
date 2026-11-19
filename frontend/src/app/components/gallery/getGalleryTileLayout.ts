/**
 * Stratégie de mise en page de la grille (inspirée maquette Figma).
 * Remplaçable sans toucher aux composants (OCP).
 */
export function getGalleryTileLayout(index: number): string {
  const position = index % 5;
  if (position === 0) return "md:col-span-7 md:row-span-2";
  if (position < 3) return "md:col-span-5";
  return "md:col-span-6";
}
