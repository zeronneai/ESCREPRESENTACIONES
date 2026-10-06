import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Download, FileText, ShieldAlert, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { articles } from "@/data/articles";
import { products } from "@/data/products";
import { getCategory } from "@/data/categories";

export const metadata: Metadata = {
  title: "Recursos y descargas",
  description: "Guías técnicas sobre cuarto limpio, control ESD y guantes industriales. Descargue el catálogo general, fichas técnicas y hojas de seguridad.",
  alternates: { canonical: "/recursos" },
};

const fmt = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });

export default function RecursosPage() {
  const withDocs = products.filter((p) => p.datasheetUrl || p.sdsUrl);
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Recursos" }]}
        eyebrow="Recursos"
        title="Guías técnicas y centro de descargas"
        intro="Información práctica para elegir el consumible correcto y la documentación que su equipo de calidad necesita."
      />

      <section className="container-x py-12">
        <h2 className="text-2xl font-extrabold">Guías</h2>
        <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link href={`/recursos/${a.slug}`} className="card group flex h-full flex-col p-6 transition hover:border-brand-300 hover:shadow-md">
                <span className="chip w-fit border-brand-200 bg-brand-50 text-brand-800"><BookOpen className="h-3 w-3" aria-hidden="true" /> {a.category}</span>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug group-hover:text-brand-700">{a.title}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">{a.excerpt}</p>
                <p className="mt-4 text-xs text-slate-500">{fmt(a.date)} · {a.readingMinutes} min de lectura</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="descargas" className="scroll-mt-44 border-t border-line bg-mist">
        <div className="container-x py-12">
          <h2 className="text-2xl font-extrabold">Centro de descargas</h2>
          <p className="mt-1 text-slate-600">Documentos de ejemplo. Se reemplazarán por los documentos oficiales de cada fabricante.</p>

          <a href="/docs/catalogo-general-ejemplo.pdf" download className="card mt-6 flex items-center gap-4 p-5 transition hover:border-brand-300">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white"><Download className="h-6 w-6" aria-hidden="true" /></span>
            <span className="flex-1">
              <span className="block font-bold">Catálogo general El Sauz</span>
              <span className="block text-sm text-slate-600">PDF · 12 categorías <span className="pending ml-1">Pendiente: catálogo oficial</span></span>
            </span>
            <ArrowRight className="h-5 w-5 text-slate-400" aria-hidden="true" />
          </a>

          <div className="card mt-6 overflow-x-auto">
            <table className="w-full min-w-[620px] text-sm">
              <caption className="sr-only">Fichas técnicas y hojas de seguridad por producto</caption>
              <thead className="bg-white text-left text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th scope="col" className="px-4 py-3">Producto</th>
                  <th scope="col" className="px-4 py-3">Categoría</th>
                  <th scope="col" className="px-4 py-3">Ficha técnica</th>
                  <th scope="col" className="px-4 py-3">Hoja de seguridad</th>
                </tr>
              </thead>
              <tbody>
                {withDocs.map((p) => (
                  <tr key={p.slug} className="border-t border-line">
                    <td className="px-4 py-2.5"><Link href={`/producto/${p.slug}`} className="font-medium hover:text-brand-700">{p.name.es}</Link><span className="block font-mono text-xs text-slate-500">{p.sku}</span></td>
                    <td className="px-4 py-2.5 text-slate-600">{getCategory(p.category)?.name.es}</td>
                    <td className="px-4 py-2.5">{p.datasheetUrl ? <a href={p.datasheetUrl} download className="inline-flex items-center gap-1 font-medium text-brand-700 hover:underline"><FileText className="h-4 w-4" aria-hidden="true" /> PDF</a> : <span className="text-slate-400">N/A</span>}</td>
                    <td className="px-4 py-2.5">{p.sdsUrl ? <a href={p.sdsUrl} download className="inline-flex items-center gap-1 font-medium text-accent-700 hover:underline"><ShieldAlert className="h-4 w-4" aria-hidden="true" /> PDF</a> : <span className="text-slate-400">No aplica</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
