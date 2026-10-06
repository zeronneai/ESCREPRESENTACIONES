"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2, ClipboardList, Paperclip, CheckCircle2, Phone, Mail, Loader2, ArrowLeft, Search } from "lucide-react";
import { useQuote } from "@/lib/quote-store";
import { useHydrated } from "@/lib/use-hydrated";
import { contactSchema, type ContactValues } from "@/lib/quote-schema";
import { quoteListWhatsappText, waLink } from "@/lib/whatsapp";
import { getProduct } from "@/data/products";
import { MX_STATES } from "@/data/states";
import { suggestAdvisor } from "@/data/advisors";
import { company } from "@/data/company";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import type { Unit } from "@/data/types";

const MAX_FILE = 5 * 1024 * 1024;

export function QuoteBuilder() {
  const hydrated = useHydrated();
  const { items, update, remove, clear } = useQuote();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [serverError, setServerError] = useState("");
  const [done, setDone] = useState<null | { folio: string; email: string; count: number }>(null);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { frequency: "mensual" },
  });

  const state = watch("state");
  const city = watch("city");
  const name = watch("name");
  const companyName = watch("company");
  const advisor = suggestAdvisor(state, city);

  const onSubmit = async (values: ContactValues) => {
    setServerError("");
    if (items.length === 0) {
      setServerError("Agregue al menos un producto a su lista o adjunte su requisición y descríbala en comentarios.");
      return;
    }
    const fd = new FormData();
    fd.set("payload", JSON.stringify({ ...values, items: items.map(({ id: _id, ...rest }) => rest) }));
    if (file) fd.set("file", file);
    try {
      const res = await fetch("/api/cotizacion", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "No se pudo enviar la solicitud.");
      setDone({ folio: json.folio, email: values.email, count: items.length });
      clear();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "No se pudo enviar la solicitud.");
    }
  };

  if (!hydrated) return <div className="container-x py-16 text-slate-500">Cargando su lista…</div>;

  if (done) {
    return (
      <div className="container-x py-12 sm:py-16">
        <div className="card mx-auto max-w-2xl p-8 text-center sm:p-12">
          <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" strokeWidth={1.5} aria-hidden="true" />
          <h1 className="mt-4 text-3xl font-extrabold">Solicitud recibida</h1>
          <p className="mt-2 text-slate-600">Su folio de cotización es</p>
          <p className="mt-2 inline-block rounded-xl bg-brand-50 px-5 py-3 font-mono text-2xl font-bold tracking-wider text-brand-800">{done.folio}</p>
          <p className="mx-auto mt-6 max-w-md text-slate-700">
            Recibimos {done.count} {done.count === 1 ? "partida" : "partidas"}. Un asesor le enviará precio, disponibilidad y tiempo de entrega a <strong>{done.email}</strong> en un máximo de <strong>24 horas hábiles</strong>.
          </p>
          <p className="mt-2 text-xs text-slate-500">Tiempo de respuesta <span className="pending">Pendiente de confirmar</span></p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/catalogo" className="btn-outline"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver al catálogo</Link>
            <a href={waLink(`Hola, acabo de enviar la solicitud de cotización ${done.folio}.`)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><WhatsAppIcon /> Dar seguimiento por WhatsApp</a>
          </div>
        </div>
      </div>
    );
  }

  const waText = quoteListWhatsappText(items, { name, company: companyName });
  const waNumber = advisor?.whatsapp ?? company.whatsapp;

  return (
    <div className="container-x grid grid-cols-1 gap-8 py-8 lg:grid-cols-12">
      {/* LISTA */}
      <section className="lg:col-span-7" aria-labelledby="lista-h">
        <div className="flex items-center justify-between">
          <h2 id="lista-h" className="text-xl font-bold">Su lista <span className="text-slate-400">({items.length})</span></h2>
          {items.length > 0 && <button onClick={() => confirm("¿Vaciar la lista de cotización?") && clear()} className="text-sm font-medium text-slate-500 hover:text-red-700">Vaciar lista</button>}
        </div>

        {items.length === 0 ? (
          <div className="card mt-4 p-10 text-center">
            <ClipboardList className="mx-auto h-10 w-10 text-slate-300" aria-hidden="true" />
            <p className="mt-3 font-semibold">Su lista está vacía</p>
            <p className="mt-1 text-sm text-slate-600">Agregue productos desde el catálogo, o adjunte su requisición en el formulario y descríbala en comentarios.</p>
            <Link href="/catalogo" className="btn-primary mt-5"><Search className="h-4 w-4" aria-hidden="true" /> Ir al catálogo</Link>
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {items.map((it) => {
              const p = getProduct(it.productSlug);
              const units: Unit[] = p?.units ?? [it.unit];
              return (
                <li key={`${it.id}-${it.unit}`} className="card p-4">
                  <div className="flex gap-4">
                    {p && (
                      <Link href={`/producto/${p.slug}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-line bg-mist">
                        <Image src={p.images[0]} alt="" fill sizes="80px" unoptimized className="object-cover" />
                      </Link>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link href={`/producto/${it.productSlug}`} className="font-semibold leading-snug hover:text-brand-700">{it.productName}</Link>
                          <p className="mt-0.5 font-mono text-xs text-slate-600">{it.variantSku}</p>
                          {it.variantLabel && <p className="text-xs text-slate-500">{it.variantLabel}</p>}
                        </div>
                        <button onClick={() => remove(it.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-700" aria-label={`Quitar ${it.productName}`}><Trash2 className="h-4 w-4" /></button>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-[110px_140px_1fr]">
                        <div>
                          <label className="sr-only" htmlFor={`q-${it.id}`}>Cantidad</label>
                          <input id={`q-${it.id}`} type="number" min={1} inputMode="numeric" value={it.qty} onChange={(e) => update(it.id, { qty: Math.max(1, Number(e.target.value) || 1) })} className="field py-2" />
                        </div>
                        <div>
                          <label className="sr-only" htmlFor={`u-${it.id}`}>Unidad</label>
                          <select id={`u-${it.id}`} value={it.unit} onChange={(e) => update(it.id, { unit: e.target.value as Unit })} className="field py-2 capitalize">
                            {units.map((u) => <option key={u} value={u}>{u}</option>)}
                          </select>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="sr-only" htmlFor={`n-${it.id}`}>Notas de la partida</label>
                          <input id={`n-${it.id}`} type="text" maxLength={500} value={it.notes} placeholder="Notas: marca equivalente, entrega parcial…" onChange={(e) => update(it.id, { notes: e.target.value })} className="field py-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {items.length > 0 && (
          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-green-200 bg-green-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-green-900">¿Prefiere WhatsApp? Enviamos su lista completa como mensaje{advisor ? ` a ${advisor.specialty}` : ""}.</p>
            <a href={waLink(waText, waNumber)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp shrink-0"><WhatsAppIcon /> Enviar mi lista por WhatsApp</a>
          </div>
        )}
        <Link href="/catalogo" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Seguir agregando productos</Link>
      </section>

      {/* FORMULARIO */}
      <section className="lg:col-span-5" aria-labelledby="form-h">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="card p-5 sm:p-6 lg:sticky lg:top-44">
          <h2 id="form-h" className="text-xl font-bold">Datos de contacto</h2>
          <p className="mt-1 text-sm text-slate-600">Los campos con * son obligatorios.</p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Nombre completo *" id="name" error={errors.name?.message}><input id="name" autoComplete="name" className="field" {...register("name")} /></Field>
            <Field label="Puesto *" id="position" error={errors.position?.message}><input id="position" autoComplete="organization-title" placeholder="Compras, Calidad…" className="field" {...register("position")} /></Field>
            <Field label="Empresa *" id="company" error={errors.company?.message} wide><input id="company" autoComplete="organization" className="field" {...register("company")} /></Field>
            <Field label="Planta o ciudad *" id="city" error={errors.city?.message}><input id="city" autoComplete="address-level2" className="field" {...register("city")} /></Field>
            <Field label="Estado *" id="state" error={errors.state?.message}>
              <select id="state" className="field" defaultValue="" {...register("state")}>
                <option value="" disabled>Seleccione…</option>
                {MX_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>

            {advisor && (
              <div className="rounded-xl border border-brand-200 bg-brand-50 p-3 sm:col-span-2" aria-live="polite">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">Su asesor sugerido</p>
                <p className="mt-1 font-semibold">{advisor.specialty}</p>
                <p className="text-xs text-slate-600">{advisor.name}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs font-semibold">
                  <a href={waLink(`Hola, soy ${name || "cliente"} y busco al asesor de ${advisor.specialty}.`, advisor.whatsapp)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#0e733c] hover:underline"><WhatsAppIcon className="h-4 w-4" /> WhatsApp</a>
                  <a href={`tel:${advisor.phone}`} className="inline-flex items-center gap-1 text-brand-700 hover:underline"><Phone className="h-3.5 w-3.5" aria-hidden="true" /> Llamar</a>
                  <a href={`mailto:${advisor.email}`} className="inline-flex items-center gap-1 text-brand-700 hover:underline"><Mail className="h-3.5 w-3.5" aria-hidden="true" /> Correo</a>
                </div>
              </div>
            )}

            <Field label="Correo *" id="email" error={errors.email?.message}><input id="email" type="email" autoComplete="email" className="field" {...register("email")} /></Field>
            <Field label="Teléfono *" id="phone" error={errors.phone?.message}><input id="phone" type="tel" autoComplete="tel" className="field" {...register("phone")} /></Field>
            <Field label="RFC (opcional)" id="rfc" error={errors.rfc?.message}><input id="rfc" className="field uppercase" maxLength={13} {...register("rfc")} /></Field>
            <Field label="Fecha requerida" id="neededBy" error={errors.neededBy?.message}><input id="neededBy" type="date" className="field" {...register("neededBy")} /></Field>

            <fieldset className="sm:col-span-2">
              <legend className="field-label">Frecuencia de compra *</legend>
              <div className="grid grid-cols-3 gap-2">
                {[{ v: "unica", l: "Única" }, { v: "mensual", l: "Mensual" }, { v: "contrato", l: "Contrato" }].map((o) => (
                  <label key={o.v} className="flex cursor-pointer items-center justify-center rounded-lg border border-slate-300 px-2 py-2 text-sm font-medium has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-800">
                    <input type="radio" value={o.v} className="sr-only" {...register("frequency")} /> {o.l}
                  </label>
                ))}
              </div>
              {errors.frequency && <p className="field-error">{errors.frequency.message}</p>}
            </fieldset>

            <Field label="Comentarios" id="comments" error={errors.comments?.message} wide>
              <textarea id="comments" rows={3} className="field" placeholder="Condiciones de entrega, especificaciones, marcas aprobadas…" {...register("comments")} />
            </Field>

            <div className="sm:col-span-2">
              <label htmlFor="file" className="field-label">Adjuntar especificación o requisición</label>
              <label htmlFor="file" className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-slate-300 px-3 py-3 text-sm text-slate-600 hover:border-brand-400 hover:bg-brand-50">
                <Paperclip className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{file ? file.name : "PDF, Excel, Word o imagen. Máximo 5 MB."}</span>
              </label>
              <input
                id="file" type="file" className="sr-only"
                accept=".pdf,.xlsx,.xls,.docx,.csv,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null;
                  setFileError("");
                  if (f && f.size > MAX_FILE) { setFileError("El archivo excede 5 MB."); setFile(null); return; }
                  setFile(f);
                }}
              />
              {fileError && <p className="field-error">{fileError}</p>}
            </div>

            {/* Honeypot anti-spam: oculto para personas */}
            <div className="hidden" aria-hidden="true"><input tabIndex={-1} autoComplete="off" {...register("website")} /></div>

            <div className="sm:col-span-2">
              <label className="flex items-start gap-2.5 text-sm text-slate-700">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-brand-600" {...register("privacy")} />
                <span>He leído y acepto el <Link href="/aviso-de-privacidad" target="_blank" className="font-medium text-brand-700 underline">Aviso de Privacidad</Link>. *</span>
              </label>
              {errors.privacy && <p className="field-error">{errors.privacy.message}</p>}
            </div>
          </div>

          {serverError && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{serverError}</p>}

          <button type="submit" disabled={isSubmitting} className="btn-accent btn-lg mt-5 w-full">
            {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <ClipboardList className="h-5 w-5" aria-hidden="true" />}
            {isSubmitting ? "Enviando…" : `Enviar solicitud${items.length ? ` (${items.length})` : ""}`}
          </button>
          <p className="mt-3 text-center text-xs text-slate-500">Respuesta en un máximo de 24 horas hábiles. <span className="pending">Pendiente</span></p>
        </form>
      </section>
    </div>
  );
}

function Field({ label, id, error, wide, children }: { label: string; id: string; error?: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="field-label">{label}</label>
      {children}
      {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}
