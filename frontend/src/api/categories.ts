import { fetchAPI } from "./Client";

export type Category = {
  id: number;
  label: string;
};

export async function getCategories(): Promise<Category[]> {
  const { data } = await fetchAPI("/api/categories");

  return data.map((item: { id: number; Label: string }) => ({
    id: item.id,
    label: item.Label,
  }));
}
