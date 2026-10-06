"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, Search } from "lucide-react";
import { products as allProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { industries } from "@/data/industries";
import type { Product } from "@/data/types";
import { searchProducts } from "@/lib/search";
import { ProductCard } from "@/components/product/ProductCard";

type FacetKey = "cat" | "ind" | "app" | "mat" | "esd" | "iso" | "uso" | "sub";

const ISO = ["ISO 5", "ISO 6", "ISO 7", "ISO 8"];

const uniq = (arr: (string | undefined)[]) => [...new Set(arr.filter(Boolean) as string[])].sort((a, b) => a.localeCompare(b, "es"));

function matches(p: Product, f: Record<FacetKey, string[]>, skip?: FacetKey) {
  const has = (k: FacetKey) => k !== skip && f[k].length > 0;
  if (has("cat") && !f.cat.includes(p.category)) return false;
  if (has("sub") && !f.sub.includes(p.subcategory ?? "")) return false;
  if (has("ind") && !p.industries.some((i) => f.ind.includes(i))) return false;
  if (has("app") && !p.applications.some((a) => f.app.includes(a))) return false;
  if (has("mat") && !f.mat.includes(p.material ?? "")) return false;
  if (has("esd") && !f.esd.includes(p.esdSafe ? "si" : "no")) return false;
  if (has("iso") && !f.iso.includes(p.cleanroomClass ?? "")) return false;
  if (has("uso") && !f.uso.includes(p.disposable ? "desechable" : "reutilizable")) return false;
  return true;
}

export function CatalogBrowser({ lockedCategory }: { lockedCategory?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [drawer, setDrawer] = useState(false);
  const [q, setQ] = useState(params.get("q") ?? "");

  const filters = useMemo(() => {
    const get = (k: FacetKey) => params.getAll(k);
    return { cat: get("cat"), ind: get("ind"), app: get("app"), mat: get("mat"), esd: get("esd"), iso: get("iso"), uso: get("uso"), sub: get("sub") } as Record<FacetKey, string[]>;
  }, [params]);
  const sort = params.get("orden") ?? "relevancia";
  const urlQ = params.get("q") ?? "";

  // Sincroniza el texto si cambia la URL (por ejemplo, desde el buscador del header).
  useEffect(() => setQ(urlQ), [urlQ]);

  const setParams = (mut: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(params.toString());
    mut(next);
    const s = next.toString();
    router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
  };

  // Búsqueda instantánea con pequeño retardo para no reescribir la URL en cada tecla.
  useEffect(() => {
    if (q === urlQ) return;
    const t = setTimeout(() => setParams((p) => (q.trim() ? p.set("q", q.trim()) : p.delete("q"))), 200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const toggle = (k: FacetKey, v: string) =>
    setParams((p) => {
      const cur = p.getAll(k);
      p.delete(k);
      (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]).forEach((x) => p.append(k, x));
    });

  const base = useMemo(() => {
    const searched = urlQ ? searchProducts(urlQ) : allProducts;
    return lockedCategory ? searched.filter((p) => p.category === lockedCategory) : searched;
  }, [urlQ, lockedCategory]);

  const results = useMemo(() => {
    const r = base.filter((p) => matches(p, filters));
    if (sort === "nombre") return [...r].sort((a, b) => a.name.es.localeCompare(b.name.es, "es"));
    return r;
  }, [base, filters, sort]);

  // Conteos por faceta (respetando los demás filtros activos).
  const count = (k: FacetKey, pred: (p: Product) => boolean) => base.filter((p) => matches(p, filters, k) && pred(p)).length;

  const scope = lockedCategory ? allProducts.filter((p) => p.category === lockedCategory) : allProducts;
  const facets: { key: FacetKey; title: string; options: { value: string; label: string; n: number }[] }[] = [
    ...(lockedCategory
      ? [{ key: "sub" as FacetKey, title: "Subcategoría", options: uniq(scope.map((p) => p.subcategory)).map((s) => ({ value: s, label: s, n: count("sub", (p) => p.subcategory === s) })) }]
      : [{ key: "cat" as FacetKey, title: "Categoría", options: categories.map((c) => ({ value: c.slug, label: c.name.es, n: count("cat", (p) => p.category === c.slug) })) }]),
    { key: "ind", title: "Industria", options: industries.map((i) => ({ value: i.slug, label: i.name, n: count("ind", (p) => p.industries.includes(i.slug)) })) },
    { key: "app", title: "Aplicación", options: uniq(scope.flatMap((p) => p.applications)).map((a) => ({ value: a, label: a, n: count("app", (p) => p.applications.includes(a)) })) },
    { key: "mat", title: "Material", options: uniq(scope.map((p) => p.material)).map((m) => ({ value: m, label: m, n: count("mat", (p) => p.material === m) })) },
    { key: "esd", title: "Compatible ESD", options: [{ value: "si", label: "Sí" }, { value: "no", label: "No" }].map((o) => ({ ...o, n: count("esd", (p) => (o.value === "si") === !!p.esdSafe) })) },
    { key: "iso", title: "Clase de cuarto limpio", options: ISO.map((c) => ({ value: c, label: c, n: count("iso", (p) => p.cleanroomClass === c) })) },
    { key: "uso", title: "Uso", options: [{ value: "desechable", label: "Desechable" }, { value: "reutilizable", label: "Reutilizable" }].map((o) => ({ ...o, n: count("uso", (p) => (o.value === "desechable") === !!p.disposable) })) },
  ];

  const active = facets.flatMap((f) => filters[f.key].map((v) => ({ key: f.key, value: v, label: f.options.find((o) => o.value === v)?.label ?? v })));
  const clearAll = () => setParams((p) => { (Object.keys(filters) as FacetKey[]).forEach((k) => p.delete(k)); p.delete("q"); });

  const FilterPanel = (
    <div className="space-y-6">
      {facets.map((f) => (
        <fieldset key={f.key}>
          <legend className="mb-2 text-sm font-bold text-ink">{f.title}</legend>
          <ul className="space-y-1">
            {f.options.filter((o) => o.n > 0 || filters[f.key].includes(o.value)).map((o) => {
              const id = `f-${f.key}-${o.value}`;
              return (
                <li key={o.value}>
                  <label htmlFor={id} className="flex cursor-pointer items-center gap-2.5 rounded-md px-1 py-1 text-sm text-slate-700 hover:bg-mist">
                    <input id={id} type="checkbox" checked={filters[f.key].includes(o.value)} onChange={() => toggle(f.key, o.value)} className="h-4 w-4 rounded border-slate-300 accent-brand-600" />
                    <span className="flex-1">{o.label}</span>
                    <span className="text-xs text-slate-400">{o.n}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      ))}
    </div>
  );

  return (
    <div className="container-x py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <label htmlFor="catalog-q" className="sr-only">Buscar en el catálogo</label>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input id="catalog-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filtrar por nombre, código o palabra clave" className="field py-3 pl-11" />
        </div>
        <div className="flex gap-2">
          <button onClick={() => setDrawer(true)} className="btn-outline flex-1 lg:hidden">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" /> Filtros {active.length > 0 && <span className="rounded-full bg-brand-600 px-1.5 text-xs text-white">{active.length}</span>}
          </button>
          <label htmlFor="orden" className="sr-only">Ordenar</label>
          <select id="orden" value={sort} onChange={(e) => setParams((p) => (e.target.value === "relevancia" ? p.delete("orden") : p.set("orden", e.target.value)))} className="field w-auto flex-1 py-3 sm:flex-none">
            <option value="relevancia">Ordenar: relevancia</option>
            <option value="nombre">Ordenar: nombre A a Z</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2" aria-live="polite">
        <p className="mr-2 text-sm text-slate-600"><strong className="text-ink">{results.length}</strong> {results.length === 1 ? "producto" : "productos"}{urlQ && <> para &ldquo;{urlQ}&rdquo;</>}</p>
        {active.map((a) => (
          <button key={`${a.key}-${a.value}`} onClick={() => toggle(a.key, a.value)} className="chip border-brand-200 bg-brand-50 text-brand-800 hover:bg-brand-100">
            {a.label} <X className="h-3 w-3" aria-label="Quitar filtro" />
          </button>
        ))}
        {(active.length > 0 || urlQ) && <button onClick={clearAll} className="text-sm font-medium text-brand-700 hover:underline">Limpiar todo</button>}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[250px_1fr]">
        <aside className="hidden lg:block" aria-label="Filtros">
          <div className="sticky top-44">{FilterPanel}</div>
        </aside>
        <div>
          {results.length === 0 ? (
            <div className="card p-10 text-center">
              <p className="text-lg font-semibold">No encontramos productos con esos criterios.</p>
              <p className="mt-2 text-slate-600">Manejamos más productos de los que aparecen en línea. Pregunte a un asesor o ajuste los filtros.</p>
              <div className="mt-6 flex justify-center gap-3">
                <button onClick={clearAll} className="btn-outline">Limpiar filtros</button>
                <a href="/contacto" className="btn-primary">Preguntar a un asesor</a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
              {results.map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 4} />)}
            </div>
          )}
        </div>
      </div>

      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filtros">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-white">
            <div className="flex h-14 items-center justify-between border-b border-line px-4">
              <p className="font-bold">Filtros</p>
              <button onClick={() => setDrawer(false)} className="rounded-lg p-2" aria-label="Cerrar filtros"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{FilterPanel}</div>
            <div className="grid grid-cols-2 gap-2 border-t border-line p-4">
              <button onClick={clearAll} className="btn-outline">Limpiar</button>
              <button onClick={() => setDrawer(false)} className="btn-primary">Ver {results.length}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
