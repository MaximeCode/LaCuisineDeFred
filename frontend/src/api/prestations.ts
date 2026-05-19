import { API_URL, fetchAPI } from "./Client";
import type { Category } from "./categories";

export type Prestation = {
  id: number;
  title: string;
  image: string;
  category?: Category;
};

export async function getPrestations(): Promise<Prestation[]> {
  const { data } = await fetchAPI("/api/prestations?populate=*");

  return data.map(
    (item: {
      id: number;
      Titre: string;
      image?: { url: string };
      categorie?: { id: number; Label: string };
    }) => ({
      id: item.id,
      title: item.Titre,
      image: `${API_URL}${item.image?.url ?? ""}`,
      category: item.categorie
        ? { id: item.categorie.id, label: item.categorie.Label }
        : undefined,
    }),
  );
}
