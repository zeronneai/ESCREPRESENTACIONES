"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Plus, X, Check } from "lucide-react";
import type { Product } from "@/data/types";
import { useQuote } from "@/lib/quote-store";
import { variantLabel } from "@/lib/variant";
import { unitLabel } from "@/lib/whatsapp";

export function QuickAdd({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [sku, setSku] = useState(product.variants[0].sku);
  const [qty, setQty] = useState(1);
  const [unit, setUnit] = useState(product.units[0]);
  const [done, setDone] = useState(false);
  const add = useQuote((s) => s.add);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const submit = () => {
    const v = product.variants.find((x) => x.sku === sku)!;
    add({ productSlug: product.slug, productName: product.name.es, variantSku: v.sku, variantLabel: variantLabel(v), qty: Math.max(1, qty), unit });
    setDone(true);
  };

  return (
    <>
      <button type="button" onClick={() => { setDone(false); setOpen(true); }} className="btn-outline w-full border-brand-200 text-brand-700 hover:bg-brand-50">
        <Plus className="h-4 w-4" aria-hidden="true" /> Agregar a cotización
      </button>
      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === dialogRef.current && setOpen(false)}
        className="m-auto w-[min(92vw,440px)] rounded-2xl p-0 shadow-2xl backdrop:bg-ink/40"
        aria-labelledby={`qa-${product.slug}`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line p-5">
          <div>
            <p className="font-mono text-xs text-slate-500">{product.sku}</p>
            <h2 id={`qa-${product.slug}`} className="mt-0.5 text-base font-bold leading-snug">{product.name.es}</h2>
          </div>
          <button onClick={() => setOpen(false)} className="rounded-lg p-1 text-slate-500 hover:bg-mist" aria-label="Cerrar"><X className="h-5 w-5" /></button>
        </div>
        {done ? (
          <div className="p-5 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700"><Check className="h-6 w-6" /></span>
            <p className="mt-3 font-semibold">Agregado a su cotización</p>
            <p className="mt-1 text-sm text-slate-600">{qty} {unitLabel(unit, qty)} · <span className="font-mono">{sku}</span></p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button onClick={() => setOpen(false)} className="btn-outline">Seguir viendo</button>
              <Link href="/cotizacion" className="btn-accent">Ver cotización</Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4 p-5">
            <div>
              <label className="field-label" htmlFor={`qa-v-${product.slug}`}>Presentación</label>
              <select id={`qa-v-${product.slug}`} className="field" value={sku} onChange={(e) => setSku(e.target.value)}>
                {product.variants.map((v) => (
                  <option key={v.sku} value={v.sku}>{v.sku} · {variantLabel(v) || "Única"}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="field-label" htmlFor={`qa-q-${product.slug}`}>Cantidad</label>
                <input id={`qa-q-${product.slug}`} type="number" min={1} inputMode="numeric" className="field" value={qty} onChange={(e) => setQty(Number(e.target.value) || 1)} />
              </div>
              <div>
                <label className="field-label" htmlFor={`qa-u-${product.slug}`}>Unidad</label>
                <select id={`qa-u-${product.slug}`} className="field capitalize" value={unit} onChange={(e) => setUnit(e.target.value as typeof unit)}>
                  {product.units.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>
            <button onClick={submit} className="btn-accent w-full"><Plus className="h-4 w-4" aria-hidden="true" /> Agregar a cotización</button>
            <Link href={`/producto/${product.slug}`} className="block text-center text-sm font-medium text-brand-700 hover:underline">Ver ficha completa</Link>
          </div>
        )}
      </dialog>
    </>
  );
}
