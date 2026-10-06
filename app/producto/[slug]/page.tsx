import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText, ShieldAlert, Info, Truck, ShieldCheck, Headset } from "lucide-react";
import { products, getProduct, getProductsBySlugs, productsByCategory } from "@/data/products";
import { getCategory } from "@/data/categories";
import { industryName } from "@/data/industries";
import { company } from "@/data/company";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Gallery } from "@/components/product/Gallery";
import { ProductConfigurator } from "@/components/product/ProductConfigurator";
import { ProductBadges } from "@/components/product/ProductBadges";
import { ProductCard } from "@/components/product/ProductCard";
import { Pending } from "@/components/ui/Pending";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name.es} (${p.sku})`,
    description: p.shortDescription.es,
    alternates: { canonical: `/producto/${p.slug}` },
    openGraph: { title: p.name.es, description: p.shortDescription.es, images: [p.images[0]] },
  };
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const cat = getCategory(p.category)!;

  const related = getProductsBySlugs(p.related).slice(0, 4);
  const fill = productsByCategory(p.category).filter((x) => x.slug !== p.slug && !related.includes(x));
  const relatedAll = [...related, ...fill].slice(0, 4);
  const together = getProductsBySlugs(p.quotedWith).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name.es,
    sku: p.sku,
    mpn: p.sku,
    description: p.description.es,
    image: p.images.map((i) => `${company.siteUrl}${i}`),
    category: cat.name.es,
    ...(p.brand && p.brand !== "PENDIENTE" ? { brand: { "@type": "Brand", name: p.brand } } : {}),
    material: p.material,
    additionalProperty: p.specs.map((s) => ({ "@type": "PropertyValue", name: s.label.es, value: s.value })),
    // Sin precio: el sitio es de cotización. No se incluye "offers".
  };

  return (
    <>
      <div className="container-x py-5">
        <Breadcrumbs items={[{ label: "Catálogo", href: "/catalogo" }, { label: cat.name.es, href: `/catalogo/${cat.slug}` }, { label: p.name.es }]} />
      </div>

      <section className="container-x grid grid-cols-1 gap-8 pb-12 lg:grid-cols-2 lg:gap-12">
        <Gallery images={p.images} alt={p.name.es} />

        <div>
          <Link href={`/catalogo/${cat.slug}`} className="eyebrow hover:underline">{cat.name.es}</Link>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">{p.name.es}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
            <span>Código base: <span className="font-mono font-semibold text-ink">{p.sku}</span></span>
            <span>Marca: <span className="font-semibold text-ink">{p.brand === "PENDIENTE" || !p.brand ? <Pending /> : p.brand}</span></span>
          </div>
          <div className="mt-3"><ProductBadges product={p} size="md" /></div>
          <p className="mt-4 text-[17px] text-slate-700">{p.shortDescription.es}</p>
          {p.placeholder && (
            <p className="mt-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> Producto de ejemplo para el prototipo. Imágenes, especificaciones y códigos se reemplazarán con la información real del proveedor.
            </p>
          )}

          <div className="mt-6 border-t border-line pt-6">
            <ProductConfigurator product={p} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {p.datasheetUrl && (
              <a href={p.datasheetUrl} download className="btn-outline"><FileText className="h-4 w-4 text-brand-600" aria-hidden="true" /> Ficha técnica (PDF)</a>
            )}
            {p.sdsUrl && (
              <a href={p.sdsUrl} download className="btn-outline"><ShieldAlert className="h-4 w-4 text-accent-700" aria-hidden="true" /> Hoja de seguridad (PDF)</a>
            )}
            {!p.datasheetUrl && !p.sdsUrl && <p className="text-sm text-slate-500">Documentación técnica disponible bajo solicitud.</p>}
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-3 border-t border-line pt-6 text-sm text-slate-700 sm:grid-cols-3">
            <li className="flex gap-2"><Truck className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" /> Envíos a los 32 estados</li>
            <li className="flex gap-2"><ShieldCheck className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" /> Trazabilidad por lote</li>
            <li className="flex gap-2"><Headset className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" /> Asesoría técnica sin costo</li>
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-mist">
        <div className="container-x grid grid-cols-1 gap-10 py-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-xl font-bold">Descripción</h2>
            <p className="mt-3 leading-relaxed text-slate-700">{p.description.es}</p>
            <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-slate-500">Industrias</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.industries.map((i) => <Link key={i} href={`/industrias/${i}`} className="chip hover:border-brand-300 hover:text-brand-700">{industryName(i)}</Link>)}
            </div>
            <h3 className="mt-5 text-sm font-bold uppercase tracking-wider text-slate-500">Aplicaciones</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.applications.map((a) => <Link key={a} href={`/catalogo?app=${encodeURIComponent(a)}`} className="chip hover:border-brand-300 hover:text-brand-700">{a}</Link>)}
            </div>
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-xl font-bold">Especificaciones</h2>
            <div className="card mt-3 overflow-hidden">
              <table className="w-full text-sm">
                <caption className="sr-only">Especificaciones técnicas de {p.name.es}</caption>
                <tbody>
                  {p.specs.map((s, i) => (
                    <tr key={s.label.es} className={i % 2 ? "bg-mist/60" : ""}>
                      <th scope="row" className="w-2/5 border-b border-line px-4 py-2.5 text-left font-medium text-slate-600">{s.label.es}</th>
                      <td className="border-b border-line px-4 py-2.5 text-ink">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="mt-8 text-xl font-bold">Presentaciones disponibles</h2>
            <div className="card mt-3 overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead className="bg-mist text-left text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th scope="col" className="px-4 py-2.5">Código</th>
                    <th scope="col" className="px-4 py-2.5">Talla / medida</th>
                    <th scope="col" className="px-4 py-2.5">Color</th>
                    <th scope="col" className="px-4 py-2.5 text-right">Pzas/paq</th>
                    <th scope="col" className="px-4 py-2.5 text-right">Paq/caja</th>
                  </tr>
                </thead>
                <tbody>
                  {p.variants.map((v) => (
                    <tr key={v.sku} className="border-t border-line">
                      <td className="px-4 py-2.5 font-mono text-xs font-semibold">{v.sku}</td>
                      <td className="px-4 py-2.5">{v.size ?? "N/A"}</td>
                      <td className="px-4 py-2.5">{v.color ?? "N/A"}</td>
                      <td className="px-4 py-2.5 text-right">{v.packQty ?? "N/A"}</td>
                      <td className="px-4 py-2.5 text-right">{v.packsPerCase ?? "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {together.length > 0 && (
        <section className="container-x py-12">
          <h2 className="text-2xl font-extrabold">También se cotizan juntos</h2>
          <p className="mt-1 text-slate-600">Productos que otros compradores agregan a la misma cotización.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {together.map((x) => <ProductCard key={x.slug} product={x} />)}
          </div>
        </section>
      )}

      {relatedAll.length > 0 && (
        <section className={`container-x pb-16 ${together.length ? "" : "pt-12"}`}>
          <h2 className="text-2xl font-extrabold">Productos relacionados</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {relatedAll.map((x) => <ProductCard key={x.slug} product={x} />)}
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
