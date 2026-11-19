import { fetchAPI } from "./Client";
import type { BlocksContent } from "./blocks";
import type { Category } from "./categories";
import {
  mapGalleryFromMedia,
  type GalleryImage,
} from "./gallery";
import {
  resolveMediaUrl,
  type MediaApiItem,
} from "./media";

export type { GalleryImage };

export type Prestation = {
  id: number;
  documentId: string;
  title: string;
  image: string;
  gallery: GalleryImage[];
  details?: BlocksContent | null;
  category?: Category;
};

type PrestationApiItem = {
  id: number;
  documentId: string;
  Titre: string;
  image?: MediaApiItem;
  galerie?: MediaApiItem[] | null;
  details?: BlocksContent | null;
  categorie?: { id: number; Label: string };
};

function mapPrestation(item: PrestationApiItem): Prestation {
  return {
    id: item.id,
    documentId: item.documentId,
    title: item.Titre,
    image: resolveMediaUrl(item.image),
    gallery: mapGalleryFromMedia(item.galerie, item.Titre),
    details: item.details,
    category: item.categorie
      ? { id: item.categorie.id, label: item.categorie.Label }
      : undefined,
  };
}

export async function getPrestations(): Promise<Prestation[]> {
  const { data } = await fetchAPI("/api/prestations?populate=*");
  return data.map(mapPrestation);
}

export async function getLatestPrestations(limit = 3): Promise<Prestation[]> {
  const { data } = await fetchAPI(
    `/api/prestations?populate=*&sort=publishedAt:desc&pagination[limit]=${limit}`,
  );
  return data.map(mapPrestation);
}

export async function getOnePrestation(
  documentId: string,
): Promise<Prestation> {
  const { data } = await fetchAPI(`/api/prestations/${documentId}?populate=*`);
  return mapPrestation(data);
}
