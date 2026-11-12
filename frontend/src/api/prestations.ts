import { API_URL, fetchAPI } from "./Client";
import type { BlocksContent } from "./blocks";
import type { Category } from "./categories";

export type Prestation = {
  id: number;
  documentId: string;
  title: string;
  image: string;
  details?: BlocksContent | null;
  category?: Category;
};

type PrestationApiItem = {
  id: number;
  documentId: string;
  Titre: string;
  image?: { url: string };
  details?: BlocksContent | null;
  categorie?: { id: number; Label: string };
};

function mapPrestation(item: PrestationApiItem): Prestation {
  return {
    id: item.id,
    documentId: item.documentId,
    title: item.Titre,
    image: `${API_URL}${item.image?.url ?? ""}`,
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
  return {
    id: data.id,
    documentId: data.documentId,
    title: data.Titre,
    image: `${API_URL}${data.image?.url ?? ""}`,
    details: data.details,
    category: data.categorie
      ? { id: data.categorie.id, label: data.categorie.Label }
      : undefined,
  };
}
