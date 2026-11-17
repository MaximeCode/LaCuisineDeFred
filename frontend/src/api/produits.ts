import { API_URL, fetchAPI } from "./Client";
import type { BlocksContent } from "./blocks";
import type { Category } from "./categories";

export type Produit = {
  id: number;
  documentId: string;
  title: string;
  image: string;
  details?: BlocksContent | null;
  price: number | null;
  unite: string;
  saison: string;
  category?: Category;
};

/**
 * Affichage prix : `{Prix}€` + `unite`.
 * Exemples d’unité en BO : `/kg`, `/pers`, ou chaîne vide pour un prix forfaitaire.
 */
export function formatProduitPrice(price: number | null, unite: string): string {
  if (price == null) {
    return "Sur devis";
  }

  const amount = formatProduitAmount(price);
  const unit = (unite ?? "").trim();

  if (!unit) {
    return amount;
  }

  if (unit.startsWith("/") || unit.startsWith("€")) {
    return `${amount.replace(/\s?€$/, "€")}${unit.replace(/^€/, "")}`;
  }

  return `${amount.replace(/\s?€$/, "€")}/${unit}`;
}

/** Montant seul, ex. `12,50 €` ou `Sur devis`. */
export function formatProduitAmount(price: number | null): string {
  if (price == null) {
    return "Sur devis";
  }

  const formatted = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(price);

  return `${formatted} €`;
}

/** Libellé d’unité sous le prix (fiche détail). */
export function formatProduitUniteLabel(unite: string): string {
  const unit = (unite ?? "").trim().replace(/^\//, "");
  if (!unit) return "";

  const normalized = unit.toLowerCase();
  if (normalized === "pers" || normalized === "personne" || normalized === "personnes") {
    return "par personne";
  }
  if (normalized === "kg" || normalized === "kilo" || normalized === "kilos") {
    return "au kilo";
  }

  return unit.startsWith("par ") || unit.startsWith("au ") ? unit : `par ${unit}`;
}

type ProduitApiItem = {
  id: number;
  documentId: string;
  Titre: string;
  image?: { url: string };
  details?: BlocksContent | null;
  Prix?: number | string | null;
  unite?: string;
  saison?: string | null;
  categorie?: { id: number; Label: string };
};

function mapProduit(item: ProduitApiItem): Produit {
  const rawPrice = item.Prix;
  const price =
    rawPrice === null || rawPrice === undefined || rawPrice === ""
      ? null
      : Number(rawPrice);

  return {
    id: item.id,
    documentId: item.documentId,
    title: item.Titre,
    image: `${API_URL}${item.image?.url ?? ""}`,
    details: item.details,
    price: Number.isFinite(price as number) ? (price as number) : null,
    unite: item.unite ?? "",
    saison: item.saison?.trim() ?? "",
    category: item.categorie
      ? { id: item.categorie.id, label: item.categorie.Label }
      : undefined,
  };
}

export async function getProduits(): Promise<Produit[]> {
  const { data } = await fetchAPI("/api/produits?populate=*");
  return data.map(mapProduit);
}

export async function getOneProduit(documentId: string): Promise<Produit> {
  const { data } = await fetchAPI(`/api/produits/${documentId}?populate=*`);
  return mapProduit(data);
}

export type ProduitsByCategory = {
  category: string;
  items: Produit[];
};

export function groupProduitsByCategory(produits: Produit[]): ProduitsByCategory[] {
  const groups = new Map<string, Produit[]>();

  for (const produit of produits) {
    const label = produit.category?.label?.trim() || "Autres";
    const existing = groups.get(label) ?? [];
    existing.push(produit);
    groups.set(label, existing);
  }

  return Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b, "fr", { sensitivity: "base" }))
    .map(([category, items]) => ({
      category,
      items: [...items].sort((a, b) =>
        a.title.localeCompare(b.title, "fr", { sensitivity: "base" }),
      ),
    }));
}
