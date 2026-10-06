"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight } from "lucide-react";
import { searchProducts } from "@/lib/search";
import { getCategory } from "@/data/categories";

type Props = { size?: "md" | "lg"; placeholder?: string; autoFocus?: boolean; onNavigate?: () => void };

export function SearchBox({ size = "md", placeholder = "Buscar por producto, código o aplicación", autoFocus, onNavigate }: Props) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const results = useMemo(() => (q.trim().length >= 2 ? searchProducts(q, 6) : []), [q]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    setQ("");
    onNavigate?.();
    router.push(href);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (active >= 0 && results[active]) return go(`/producto/${results[active].slug}`);
    go(q.trim() ? `/catalogo?q=${encodeURIComponent(q.trim())}` : "/catalogo");
  };

  const lg = size === "lg";

  return (
    <div ref={wrapRef} className="relative w-full">
      <form role="search" onSubmit={submit} className="relative">
        <label htmlFor={`${listId}-input`} className="sr-only">Buscar en el catálogo</label>
        <Search className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 ${lg ? "left-5 h-6 w-6" : "left-3.5 h-5 w-5"}`} aria-hidden="true" />
        <input
          id={`${listId}-input`}
          type="search"
          autoComplete="off"
          autoFocus={autoFocus}
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls={listId}
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
          value={q}
          placeholder={placeholder}
          onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(-1); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, -1)); }
            if (e.key === "Escape") setOpen(false);
          }}
          className={`w-full rounded-xl border border-slate-300 bg-white text-ink shadow-sm placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-100 ${
            lg ? "py-4 pl-14 pr-32 text-base sm:py-5 sm:text-lg" : "py-2.5 pl-11 pr-4 text-sm"
          }`}
        />
        {lg && (
          <button type="submit" className="btn-accent absolute right-2 top-1/2 -translate-y-1/2 sm:px-6 sm:py-3">
            Buscar
          </button>
        )}
      </form>

      {open && q.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-line bg-white shadow-xl">
          {results.length === 0 ? (
            <div className="p-4 text-sm text-slate-600">
              Sin resultados para <strong>&ldquo;{q}&rdquo;</strong>. Pregunte a un asesor, manejamos más productos de los que aparecen en línea.
            </div>
          ) : (
            <ul id={listId} role="listbox" className="max-h-[60vh] overflow-auto py-1">
              {results.map((p, i) => (
                <li key={p.slug} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                  <Link
                    href={`/producto/${p.slug}`}
                    onClick={() => { setOpen(false); setQ(""); onNavigate?.(); }}
                    className={`flex items-center gap-3 px-3 py-2 ${i === active ? "bg-brand-50" : "hover:bg-mist"}`}
                  >
                    <Image src={p.images[0]} alt="" width={44} height={44} unoptimized className="h-11 w-11 rounded-md border border-line bg-mist object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">{p.name.es}</span>
                      <span className="block truncate text-xs text-slate-500">
                        <span className="font-mono">{p.sku}</span> · {getCategory(p.category)?.name.es}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link
            href={`/catalogo?q=${encodeURIComponent(q.trim())}`}
            onClick={() => { setOpen(false); onNavigate?.(); }}
            className="flex items-center justify-between border-t border-line bg-mist px-4 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            Ver todos los resultados <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}
