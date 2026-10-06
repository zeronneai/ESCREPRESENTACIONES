import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { CatalogBrowser } from "@/components/catalog/CatalogBrowser";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Catálogo de productos",
  description: "Catálogo de consumibles para cuarto limpio, control ESD, guantes, wipes, hisopos, desechables y equipo de seguridad. Filtre por industria, material y clase ISO.",
  alternates: { canonical: "/catalogo" },
};

export default function CatalogoPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Catálogo" }]}
        eyebrow="Catálogo virtual"
        title="Todos los productos"
        intro={`${products.length} productos de muestra en 12 categorías. Filtre por industria, aplicación, material, clase de cuarto limpio o compatibilidad ESD y agréguelos a su cotización.`}
      />
      <Suspense fallback={<div className="container-x py-16 text-slate-500">Cargando catálogo…</div>}>
        <CatalogBrowser />
      </Suspense>
    </>
  );
}
