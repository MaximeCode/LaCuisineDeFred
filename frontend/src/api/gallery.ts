import {
  isMediaWithUrl,
  resolveMediaAlt,
  resolveMediaUrl,
  type MediaApiItem,
} from "./media";

/** Image de galerie prête pour l’UI (indépendante de Strapi). */
export type GalleryImage = {
  src: string;
  alt: string;
};

export const MAX_GALLERY_IMAGES = 20;

/**
 * Transforme une liste de médias Strapi en galerie UI.
 * Ouverte à l’extension via `max` ; fermée côté mapping (SRP).
 */
export function mapGalleryFromMedia(
  items: MediaApiItem[] | null | undefined,
  fallbackAlt: string,
  max: number = MAX_GALLERY_IMAGES,
): GalleryImage[] {
  if (!Array.isArray(items) || max <= 0) return [];

  return items
    .filter(isMediaWithUrl)
    .slice(0, max)
    .map((item, index) => ({
      src: resolveMediaUrl(item),
      alt: resolveMediaAlt(item, `${fallbackAlt} — photo ${index + 1}`),
    }));
}

/** Limite une galerie déjà mappée (défense en profondeur côté UI). */
export function limitGallery(
  images: GalleryImage[],
  max: number = MAX_GALLERY_IMAGES,
): GalleryImage[] {
  if (max <= 0) return [];
  return images.slice(0, max);
}
