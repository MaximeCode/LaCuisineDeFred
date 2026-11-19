import { API_URL } from "./Client";

/** Forme brute d’un média renvoyé par Strapi. */
export type MediaApiItem = {
  url?: string;
  alternativeText?: string | null;
};

export function isMediaWithUrl(
  item: MediaApiItem,
): item is MediaApiItem & { url: string } {
  return Boolean(item?.url);
}

/** Construit l’URL absolue d’un média Strapi (chaîne vide si absent). */
export function resolveMediaUrl(media?: MediaApiItem | null): string {
  const url = media?.url?.trim();
  if (!url) return "";
  return `${API_URL}${url}`;
}

/** Texte alternatif Strapi, ou repli fourni. */
export function resolveMediaAlt(
  media: MediaApiItem | null | undefined,
  fallback: string,
): string {
  const alt = media?.alternativeText?.trim();
  return alt || fallback;
}
