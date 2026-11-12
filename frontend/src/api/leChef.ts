import { API_URL, fetchAPI } from "./Client";
import type { BlocksContent } from "./blocks";

export type Philosophie = {
  id?: number;
  titre: string;
  description: string;
};

export type LeChefContent = {
  titre: string;
  description: BlocksContent;
  image: string | null;
  philosophies: Philosophie[];
};

const EMPTY_LE_CHEF: LeChefContent = {
  titre: "",
  description: [],
  image: null,
  philosophies: [],
};

type PhilosophieApi = {
  id?: number;
  titre?: string;
  description?: string | null;
};

type LeChefApi = {
  titre?: string | null;
  description?: BlocksContent | null;
  image?: { url: string } | null;
  philosophies?: PhilosophieApi[] | null;
};

export async function getLeChef(): Promise<LeChefContent> {
  try {
    const { data } = await fetchAPI(
      "/api/le-chef?populate[image]=true&populate[philosophies]=true",
    );

    if (!data) {
      return EMPTY_LE_CHEF;
    }

    const item = data as LeChefApi;

    return {
      titre: item.titre?.trim() ?? "",
      description: item.description ?? [],
      image: item.image?.url ? `${API_URL}${item.image.url}` : null,
      philosophies: (item.philosophies ?? [])
        .filter((p) => p.titre?.trim())
        .map((p) => ({
          id: p.id,
          titre: p.titre!.trim(),
          description: p.description?.trim() ?? "",
        })),
    };
  } catch {
    return EMPTY_LE_CHEF;
  }
}
