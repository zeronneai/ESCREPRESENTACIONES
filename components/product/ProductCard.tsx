import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/types";
import { getCategory } from "@/data/categories";
import { ProductBadges } from "./ProductBadges";
import { QuickAdd } from "./QuickAdd";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const cat = getCategory(product.category);
  return (
    <article className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-lg hover:shadow-slate-900/5">
      <Link href={`/producto/${product.slug}`} className="relative block aspect-square overflow-hidden bg-mist" tabIndex={-1} aria-hidden="true">
        <Image
          src={product.images[0]}
          alt=""
          fill
          sizes="(min-width:1280px) 280px, (min-width:768px) 33vw, 50vw"
          unoptimized={product.images[0].endsWith(".svg")}
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-brand-600">{cat?.name.es}</p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-ink sm:text-[15px]">
          <Link href={`/producto/${product.slug}`} className="hover:text-brand-700">{product.name.es}</Link>
        </h3>
        <p className="mt-1 font-mono text-xs text-slate-500">{product.sku}</p>
        <div className="mt-2.5"><ProductBadges product={product} /></div>
        <p className="mt-2 text-xs text-slate-500">{product.variants.length} {product.variants.length === 1 ? "presentación" : "presentaciones"}</p>
        <div className="mt-auto pt-3"><QuickAdd product={product} /></div>
      </div>
    </article>
  );
}
