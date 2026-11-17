import { fetchAPI } from "./Client";
import type { BlocksContent, BlocksRootNode, ListBlockNode, ListItemInlineNode } from "./blocks";

export type Formule = {
  id: number;
  documentId: string;
  titre: string;
  description: string;
  prix: number | null;
  details: BlocksContent;
  populaire: boolean;
  /** Plain lines extracted from blocks for Check-list UI */
  detailLines: string[];
};

export function formatFormulePrice(prix: number | null): {
  label: string;
  detail: string;
} {
  if (prix == null) {
    return { label: "Sur devis", detail: "personnalisé" };
  }

  const amount = Number.isInteger(prix) ? `${prix}` : `${prix}`;
  return { label: `${amount}€`, detail: "par personne" };
}

function inlineText(
  nodes: { type: string; text?: string; children?: { type: string; text?: string }[] }[]
): string {
  return nodes
    .map((node) => {
      if (node.type === "text") return node.text ?? "";
      if (node.type === "link" && node.children) {
        return node.children.map((child) => child.text ?? "").join("");
      }
      return "";
    })
    .join("")
    .trim();
}

function collectListLines(list: ListBlockNode, lines: string[]) {
  for (const child of list.children) {
    if (child.type === "list") {
      collectListLines(child, lines);
      continue;
    }
    const item = child as ListItemInlineNode;
    const text = inlineText(item.children);
    if (text) lines.push(text);
  }
}

/** Prefer unordered/ordered list items; fall back to non-empty paragraphs. */
export function extractFormuleDetailLines(details?: BlocksContent | null): string[] {
  if (!details?.length) return [];

  const lines: string[] = [];
  for (const block of details as BlocksRootNode[]) {
    if (block.type === "list") {
      collectListLines(block, lines);
    }
  }

  if (lines.length > 0) return lines;

  for (const block of details) {
    if (block.type === "paragraph") {
      const text = inlineText(block.children);
      if (text) lines.push(text);
    }
  }

  return lines;
}

type FormuleApiItem = {
  id: number;
  documentId: string;
  titre: string;
  description?: string | null;
  prix?: number | string | null;
  details?: BlocksContent | null;
  populaire?: boolean;
};

function mapFormule(item: FormuleApiItem): Formule {
  const rawPrice = item.prix;
  const prix =
    rawPrice === null || rawPrice === undefined || rawPrice === "" ? null : Number(rawPrice);
  const details = item.details ?? [];

  return {
    id: item.id,
    documentId: item.documentId,
    titre: item.titre,
    description: item.description ?? "",
    prix: Number.isFinite(prix as number) ? (prix as number) : null,
    details,
    populaire: Boolean(item.populaire),
    detailLines: extractFormuleDetailLines(details),
  };
}

/**
 * Tri : prix croissant, « Sur devis » (null) en dernier.
 * À égalité de prix : titre ASC.
 */
export function sortFormules(formules: Formule[]): Formule[] {
  return [...formules].sort((a, b) => {
    if (a.prix == null && b.prix == null) {
      return a.titre.localeCompare(b.titre, "fr", { sensitivity: "base" });
    }
    if (a.prix == null) return 1;
    if (b.prix == null) return -1;
    if (a.prix !== b.prix) return a.prix - b.prix;
    return a.titre.localeCompare(b.titre, "fr", { sensitivity: "base" });
  });
}

export async function getFormules(): Promise<Formule[]> {
  const { data } = await fetchAPI("/api/formules?populate=*&sort=prix:asc");
  return sortFormules(data.map(mapFormule));
}
