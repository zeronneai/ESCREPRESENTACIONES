import type { Variant } from "@/data/types";

export const variantLabel = (v: Variant) =>
  [v.size, v.color, v.packQty ? `${v.packQty} pzas/paq` : undefined, v.packsPerCase ? `${v.packsPerCase} paq/caja` : undefined]
    .filter(Boolean)
    .join(" · ");

export const variantShortLabel = (v: Variant) => [v.size, v.color].filter(Boolean).join(" · ");
