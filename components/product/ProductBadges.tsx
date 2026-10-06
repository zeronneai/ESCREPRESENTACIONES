import { Zap, Sparkles, Recycle, Trash2 } from "lucide-react";
import type { Product } from "@/data/types";

export function ProductBadges({ product, size = "sm" }: { product: Product; size?: "sm" | "md" }) {
  const cls = size === "md" ? "chip px-3 py-1 text-[13px]" : "chip";
  return (
    <div className="flex flex-wrap gap-1.5">
      {product.esdSafe && (
        <span className={`${cls} border-amber-200 bg-amber-50 text-amber-900`}><Zap className="h-3 w-3" aria-hidden="true" /> ESD</span>
      )}
      {product.cleanroomClass && (
        <span className={`${cls} border-brand-200 bg-brand-50 text-brand-800`}><Sparkles className="h-3 w-3" aria-hidden="true" /> {product.cleanroomClass}</span>
      )}
      {product.disposable !== undefined && (
        <span className={cls}>
          {product.disposable ? <Trash2 className="h-3 w-3" aria-hidden="true" /> : <Recycle className="h-3 w-3" aria-hidden="true" />}
          {product.disposable ? "Desechable" : "Reutilizable"}
        </span>
      )}
    </div>
  );
}
