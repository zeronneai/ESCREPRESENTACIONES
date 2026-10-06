import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getCategory } from "@/data/categories";
import { productsByCategory } from "@/data/products";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CatalogBrowser } from "@/components/catalog/CatalogBrowser";
import { Icon } from "@/components/ui/Icon";

type Props = { params: Promise<{ categoria: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const c = getCategory(categoria);
  if (!c) return {};
  return { title: c.name.es, description: c.seo[0].slice(0, 158), alternates: { canonical: `/catalogo/${c.slug}` } };
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;
  const c = getCategory(categoria);
  if (!c) notFound();
  const n = productsByCategory(c.slug).length;

  return (
    <>
      <section className="border-b border-line bg-mist bg-grid">
        <div className="container-x py-8 sm:py-12">
          <Breadcrumbs items={[{ label: "Catálogo", href: "/catalogo" }, { label: c.name.es }]} />
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white"><Icon name={c.icon} className="h-7 w-7" /></span>
              <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{c.name.es}</h1>
              <p className="mt-2 text-lg text-slate-600">{c.tagline}</p>
              <p className="mt-4 text-sm text-slate-500">{n} productos de muestra</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.subcategories.map((s) => (
                  <Link key={s} href={`/catalogo/${c.slug}?sub=${encodeURIComponent(s)}`} scroll={false} className="rounded-full border border-line bg-white px-3 py-1 text-sm text-slate-700 hover:border-brand-300 hover:text-brand-700">{s}</Link>
                ))}
              </div>
            </div>
            <div className="text-[15px] leading-relaxed text-slate-700 lg:col-span-7 lg:border-l lg:border-line lg:pl-8">
              {c.seo.map((para, i) => <p key={i} className="mb-3">{para}</p>)}
            </div>
          </div>
        </div>
      </section>
      <Suspense fallback={<div className="container-x py-16 text-slate-500">Cargando productos…</div>}>
        <CatalogBrowser lockedCategory={c.slug} />
      </Suspense>
    </>
  );
}
