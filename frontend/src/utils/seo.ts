export const SITE_NAME = 'La Cuisine de Fred';

export const SITE_URL = (
  import.meta.env.VITE_SITE_URL as string | undefined
)?.replace(/\/$/, '') || 'https://lacuisinedefred-traiteur.fr';

export const DEFAULT_DESCRIPTION =
  'La Cuisine de Fred, traiteur et chef à domicile à Chartres (Eure-et-Loir) : mariage, anniversaire, repas d\'entreprise et cuisine maison sur mesure.';

/** Construit un title de page unique, sauf si le titre est déjà le nom du site. */
export function buildTitle(pageTitle: string) {
  const trimmed = pageTitle.trim();
  if (!trimmed || trimmed === SITE_NAME) return SITE_NAME;
  return `${trimmed} | ${SITE_NAME}`;
}

/** URL absolue pour canonical / OG / JSON-LD. */
export function absoluteUrl(path = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (typeof window !== 'undefined' && !import.meta.env.VITE_SITE_URL) {
    return `${window.location.origin}${normalized}`;
  }
  return `${SITE_URL}${normalized}`;
}

type LocalBusinessContact = {
  streetAddress?: string;
  postalCode?: string;
  addressLocality?: string;
  telephone?: string;
  email?: string;
};

export function buildLocalBusinessJsonLd(contact: LocalBusinessContact = {}) {
  const streetAddress = contact.streetAddress?.trim() || undefined;
  const postalCode = contact.postalCode?.trim() || undefined;
  const addressLocality = contact.addressLocality?.trim() || 'Chartres';
  const telephone = contact.telephone?.trim() || undefined;
  const email = contact.email?.trim() || undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: SITE_NAME,
    alternateName: 'La Cuisine de Fred Traiteur',
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    image: absoluteUrl('/'),
    servesCuisine: 'Française',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      addressLocality,
      addressRegion: 'Eure-et-Loir',
      ...(postalCode ? { postalCode } : {}),
      ...(streetAddress ? { streetAddress } : {}),
      addressCountry: 'FR',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Chartres',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Eure-et-Loir',
      },
    ],
    ...(telephone ? { telephone } : {}),
    ...(email ? { email } : {}),
  };
}
