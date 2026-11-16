import { fetchAPI } from './Client';

export type DonneesPersonnelles = {
  prenom: string;
  nom: string;
  telephone: string;
  email: string;
};

export type DonneesProfessionnelles = {
  denomination: string;
  formeJuridique: string;
  rue: string;
  codePostal: string;
  ville: string;
  siret: string;
  siren: string;
  codeApe: string;
  tva: string;
  qualiteDirecteur: string;
};

export type DonneesLegales = {
  personnelles: DonneesPersonnelles;
  professionnelles: DonneesProfessionnelles;
  /** ISO date from Strapi `updatedAt` */
  updatedAt: string | null;
};

export const EMPTY_DONNEES_LEGALES: DonneesLegales = {
  personnelles: {
    prenom: '',
    nom: '',
    telephone: '',
    email: '',
  },
  professionnelles: {
    denomination: '',
    formeJuridique: '',
    rue: '',
    codePostal: '',
    ville: '',
    siret: '',
    siren: '',
    codeApe: '',
    tva: '',
    qualiteDirecteur: '',
  },
  updatedAt: null,
};

type PersonnellesApi = Partial<DonneesPersonnelles> | null;
type ProfessionnellesApi = Partial<DonneesProfessionnelles> | null;

type DonneesLegalesApi = {
  personnelles?: PersonnellesApi;
  professionnelles?: ProfessionnellesApi;
  updatedAt?: string | null;
};

function str(value: string | undefined | null): string {
  return value?.trim() ?? '';
}

export function directeurPublication(data: DonneesLegales): string {
  return `${data.personnelles.prenom} ${data.personnelles.nom}`.trim();
}

export function formatAdresseComplete(data: DonneesLegales): string {
  const { rue, codePostal, ville } = data.professionnelles;
  return [rue, `${codePostal} ${ville}`.trim()].filter(Boolean).join(', ');
}

export function formatUpdatedAtFr(iso: string | null): string {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return '';
  }
}

export function telHref(telephone: string): string {
  return `tel:${telephone.replace(/[\s.-]/g, '')}`;
}

let cache: Promise<DonneesLegales> | null = null;

export async function getDonneesLegales(): Promise<DonneesLegales> {
  if (!cache) {
    cache = (async () => {
      try {
        const { data } = await fetchAPI(
          '/api/donnees-legale?populate[personnelles]=true&populate[professionnelles]=true',
        );

        if (!data) {
          return EMPTY_DONNEES_LEGALES;
        }

        const item = data as DonneesLegalesApi;
        const p = item.personnelles ?? {};
        const pro = item.professionnelles ?? {};

        return {
          personnelles: {
            prenom: str(p.prenom),
            nom: str(p.nom),
            telephone: str(p.telephone),
            email: str(p.email),
          },
          professionnelles: {
            denomination: str(pro.denomination),
            formeJuridique: str(pro.formeJuridique),
            rue: str(pro.rue),
            codePostal: str(pro.codePostal),
            ville: str(pro.ville),
            siret: str(pro.siret),
            siren: str(pro.siren),
            codeApe: str(pro.codeApe),
            tva: str(pro.tva),
            qualiteDirecteur: str(pro.qualiteDirecteur),
          },
          updatedAt: item.updatedAt ?? null,
        };
      } catch {
        return EMPTY_DONNEES_LEGALES;
      }
    })();
  }

  return cache;
}
