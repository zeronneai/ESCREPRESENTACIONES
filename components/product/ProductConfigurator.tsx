"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Minus, Plus, ClipboardList } from "lucide-react";
import type { Product, Unit } from "@/data/types";
import { useQuote } from "@/lib/quote-store";
import { variantLabel } from "@/lib/variant";
import { productWhatsappText, unitLabel, waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const uniq = (xs: (string | undefined)[]) => [...new Set(xs.filter(Boolean) as string[])];

export function ProductConfigurator({ product }: { product: Product }) {
  const sizes = uniq(product.variants.map((v) => v.size));
  const colors = uniq(product.variants.map((v) => v.color));
  const [size, setSize] = useState(product.variants[0].size);
  const [color, setColor] = useState(product.variants[0].color);
  const [qty, setQty] = useState(1);
  const [unit, setUnit] = useState<Unit>(product.units[0]);
  const [added, setAdded] = useState(false);
  const add = useQuote((s) => s.add);

  const variant = useMemo(
    () => product.variants.find((v) => v.size === size && v.color === color) ?? null,
    [product.variants, size, color],
  );
  const available = (field: "size" | "color", value: string) =>
    product.variants.some((v) => v[field] === value && (field === "size" ? !color || v.color === color : !size || v.size === size));

  // Al elegir un valor sin combinación válida, se salta a la primera variante disponible con ese valor.
  const pick = (field: "size" | "color", value: string) => {
    setAdded(false);
    const exact = product.variants.find((v) => v[field] === value && (field === "size" ? v.color === color : v.size === size));
    const any = exact ?? product.variants.find((v) => v[field] === value)!;
    setSize(any.size);
    setColor(any.color);
  };

  const onAdd = () => {
    if (!variant) return;
    add({ productSlug: product.slug, productName: product.name.es, variantSku: variant.sku, variantLabel: variantLabel(variant), qty: Math.max(1, qty), unit });
    setAdded(true);
  };

  return (
    <div className="space-y-5">
      {sizes.length > 0 && (
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Talla / medida: <span className="font-normal text-slate-600">{size}</span></legend>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => {
              const ok = available("size", s);
              return (
                <button key={s} type="button" onClick={() => pick("size", s)} aria-pressed={s === size}
                  className={`min-w-11 rounded-lg border px-3 py-2 text-sm font-medium transition ${s === size ? "border-brand-600 bg-brand-50 text-brand-800 ring-1 ring-brand-600" : ok ? "border-slate-300 hover:border-brand-400" : "border-dashed border-slate-300 text-slate-400"}`}>
                  {s}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}
      {colors.length > 0 && (
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Color: <span className="font-normal text-slate-600">{color}</span></legend>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => {
              const ok = available("color", c);
              return (
                <button key={c} type="button" onClick={() => pick("color", c)} aria-pressed={c === color}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${c === color ? "border-brand-600 bg-brand-50 text-brand-800 ring-1 ring-brand-600" : ok ? "border-slate-300 hover:border-brand-400" : "border-dashed border-slate-300 text-slate-400"}`}>
                  {c}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Presentación seleccionada */}
      <div className="rounded-xl border border-line bg-mist p-4">
        {variant ? (
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
            <div className="col-span-2 sm:col-span-1"><dt className="text-xs text-slate-500">Código</dt><dd className="font-mono font-semibold text-ink">{variant.sku}</dd></div>
            <div><dt className="text-xs text-slate-500">Piezas por paquete</dt><dd className="font-semibold">{variant.packQty ?? "N/A"}</dd></div>
            <div><dt className="text-xs text-slate-500">Paquetes por caja</dt><dd className="font-semibold">{variant.packsPerCase ?? "N/A"}</dd></div>
          </dl>
        ) : (
          <p className="text-sm text-slate-600">Esta combinación no está disponible. Elija otra talla o color.</p>
        )}
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor="qty" className="field-label">Cantidad</label>
          <div className="flex items-center rounded-lg border border-slate-300 bg-white">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2.5 text-slate-600 hover:text-ink" aria-label="Disminuir"><Minus className="h-4 w-4" /></button>
            <input id="qty" type="number" min={1} inputMode="numeric" value={qty} onChange={(e) => { setAdded(false); setQty(Math.max(1, Number(e.target.value) || 1)); }} className="w-16 border-x border-slate-300 py-2 text-center text-sm font-semibold focus:outline-none" />
            <button type="button" onClick={() => setQty((q) => q + 1)} className="p-2.5 text-slate-600 hover:text-ink" aria-label="Aumentar"><Plus className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="unit" className="field-label">Unidad</label>
          <select id="unit" value={unit} onChange={(e) => { setAdded(false); setUnit(e.target.value as Unit); }} className="field capitalize">
            {product.units.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button type="button" onClick={onAdd} disabled={!variant} className="btn-accent btn-lg">
          {added ? <Check className="h-5 w-5" aria-hidden="true" /> : <ClipboardList className="h-5 w-5" aria-hidden="true" />}
          {added ? "Agregado" : "Agregar a cotización"}
        </button>
        <a href={waLink(productWhatsappText(product.name.es, variant?.sku ?? product.sku))} target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-lg">
          <WhatsAppIcon /> Preguntar por WhatsApp
        </a>
      </div>
      {added && (
        <p role="status" className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-900">
          <span>{qty} {unitLabel(unit, qty)} de <span className="font-mono">{variant?.sku}</span> en su lista.</span>
          <Link href="/cotizacion" className="font-semibold underline">Ver cotización</Link>
        </p>
      )}
    </div>
  );
}
