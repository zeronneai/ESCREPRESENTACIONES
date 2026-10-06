import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { industries } from "@/data/industries";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Industrias que atendemos", description: "Consumibles y equipo de protección para electrónica, automotriz, dispositivos médicos, aeroespacial, laboratorios y alimentos.", alternates: { canonical: "/industrias" } };

export default function IndustriasPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Industrias" }]} eyebrow="Industrias" title="Soluciones por industria" intro="Cada proceso tiene retos distintos. Conozca los productos que recomendamos para su sector." />
      <section className="container-x grid grid-cols-1 gap-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((i) => (
          <Link key={i.slug} href={`/industrias/${i.slug}`} className="card group p-6 transition hover:border-brand-300 hover:shadow-md">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 group-hover:bg-brand-600 group-hover:text-white"><Icon name={i.icon} className="h-6 w-6" /></span>
            <h2 className="mt-4 text-xl font-bold">{i.name}</h2>
            <p className="mt-1 text-sm text-slate-600">{i.summary}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
