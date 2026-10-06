import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { articles, getArticle } from "@/data/articles";
import { getProductsBySlugs } from "@/data/products";
import { company } from "@/data/company";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/product/ProductCard";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return { title: a.title, description: a.excerpt, alternates: { canonical: `/recursos/${a.slug}` }, openGraph: { type: "article", title: a.title, description: a.excerpt } };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const related = getProductsBySlugs(a.relatedProducts);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    datePublished: a.date,
    inLanguage: "es-MX",
    publisher: { "@type": "Organization", name: company.brand, logo: { "@type": "ImageObject", url: `${company.siteUrl}/brand/logo-esc.png` } },
  };

  return (
    <>
      <article className="container-x max-w-3xl py-8 sm:py-12">
        <Breadcrumbs items={[{ label: "Recursos", href: "/recursos" }, { label: a.category }]} />
        <p className="eyebrow mt-6">{a.category}</p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">{a.title}</h1>
        <p className="mt-3 text-lg text-slate-600">{a.excerpt}</p>
        <p className="mt-3 text-sm text-slate-500">
          {new Date(a.date + "T12:00:00").toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })} · {a.readingMinutes} min de lectura
        </p>
        <div className="prose-sauz mt-8 border-t border-line pt-8">
          {a.body.map((b, i) =>
            b.type === "h2" ? <h2 key={i}>{b.text}</h2> : b.type === "ul" ? <ul key={i}>{b.items!.map((it) => <li key={it}>{it}</li>)}</ul> : <p key={i}>{b.text}</p>,
          )}
        </div>
        <div className="mt-10 flex flex-col gap-3 rounded-2xl bg-brand-50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-brand-900">¿Dudas sobre qué producto elegir? Pregunte a un especialista.</p>
          <a href={waLink(`Hola, leí la guía "${a.title}" y tengo una pregunta.`)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp shrink-0"><WhatsAppIcon /> Preguntar por WhatsApp</a>
        </div>
      </article>
      {related.length > 0 && (
        <section className="border-t border-line bg-mist">
          <div className="container-x py-12">
            <h2 className="text-2xl font-extrabold">Productos mencionados</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
            <Link href="/recursos" className="mt-8 inline-block font-semibold text-brand-700 hover:underline">Ver todas las guías</Link>
          </div>
        </section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
