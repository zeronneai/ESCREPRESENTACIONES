import Fuse from "fuse.js";
import { products } from "@/data/products";
import type { Product } from "@/data/types";
import { getCategory } from "@/data/categories";

// Índice plano: nombre, códigos de todas las variantes, categoría, material, aplicaciones.
type Doc = { product: Product; name: string; sku: string; variantSkus: string; category: string; keywords: string };

const docs: Doc[] = products.map((p) => ({
  product: p,
  name: p.name.es,
  sku: p.sku,
  variantSkus: p.variants.map((v) => v.sku).join(" "),
  category: getCategory(p.category)?.name.es ?? "",
  keywords: [p.subcategory, p.material, p.brand, ...p.applications, p.shortDescription.es, p.cleanroomClass, p.esdSafe ? "ESD antiestático" : ""]
    .filter(Boolean)
    .join(" "),
}));

let fuse: Fuse<Doc> | null = null;

export function searchProducts(query: string, limit?: number): Product[] {
  const q = query.trim();
  if (!q) return products;
  fuse ??= new Fuse(docs, {
    keys: [
      { name: "sku", weight: 3 },
      { name: "variantSkus", weight: 2 },
      { name: "name", weight: 3 },
      { name: "category", weight: 1.5 },
      { name: "keywords", weight: 1 },
    ],
    threshold: 0.38,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });
  const res = fuse.search(q, limit ? { limit } : undefined);
  return res.map((r) => r.item.product);
}
