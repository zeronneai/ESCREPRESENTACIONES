import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { industries, getIndustry } from "@/data/industries";
import { getProductsBySlugs } from "@/data/products";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/product/ProductCard";
import { Icon } from "@/components/ui/Icon";

type Props = { params: Promise<{ industria: string }> };

export function generateStaticParams() {
  return industries.map((i) => ({ industria: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industria } = await params;
  const i = getIndustry(industria);
  if (!i) return {};
  return { title: `Industria ${i.name}`, description: i.summary, alternates: { canonical: `/industrias/${i.slug}` } };
}

export default async function IndustriaPage({ params }: Props) {
  const { industria } = await params;
  const ind = getIndustry(industria);
  if (!ind) notFound();
  const recommended = getProductsBySlugs(ind.recommended);

  return (
    <>
      <section className="bg-brand-800 text-white">
        <div className="container-x py-10 sm:py-14">
          <Breadcrumbs tone="dark" items={[{ label: "Industrias", href: "/industrias" }, { label: ind.name }]} />
          <div className="mt-6 flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10"><Icon name={ind.icon} className="h-7 w-7 text-brand-100" /></span>
            <div>
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{ind.name}</h1>
              <p className="mt-2 max-w-2xl text-lg text-brand-100">{ind.summary}</p>
            </div>
          </div>
          <nav aria-label="Otras industrias" className="mt-8 flex flex-wrap gap-2">
            {industries.map((i) => (
              <Link key={i.slug} href={`/industrias/${i.slug}`} aria-current={i.slug === ind.slug ? "page" : undefined}
                className={`rounded-full px-3 py-1 text-sm ${i.slug === ind.slug ? "bg-white font-semibold text-brand-800" : "border border-white/20 text-white hover:bg-white/10"}`}>
                {i.name}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="container-x py-12">
        <h2 className="text-2xl font-extrabold">Retos comunes en {ind.name.toLowerCase()}</h2>
        <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {ind.challenges.map((c) => (
            <li key={c.title} className="card p-5">
              <AlertTriangle className="h-6 w-6 text-accent-700" strokeWidth={1.6} aria-hidden="true" />
              <h3 className="mt-3 font-bold">{c.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{c.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line bg-mist">
        <div className="container-x py-12">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-extrabold">Productos recomendados</h2>
              <p className="mt-1 text-slate-600">Selección del catálogo para plantas de {ind.name.toLowerCase()}.</p>
            </div>
            <Link href={`/catalogo?ind=${ind.slug}`} className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:underline">Ver todos para esta industria <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {recommended.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      <section className="container-x py-12">
        <div className="card flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold">¿Necesita un paquete por estación o por área?</h2>
            <p className="mt-1 text-slate-600">Un asesor puede proponerle una lista estándar para todas sus plantas.</p>
          </div>
          <Link href="/contacto" className="btn-accent shrink-0">Hablar con un asesor</Link>
        </div>
      </section>
    </>
  );
}
