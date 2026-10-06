import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { company } from "@/data/company";

export const metadata: Metadata = { title: "Términos de uso", alternates: { canonical: "/terminos" } };

export default function TerminosPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Términos de uso" }]} title="Términos de uso" />
      <article className="container-x prose-sauz max-w-3xl py-10">
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">PENDIENTE: texto de referencia. Debe ser revisado por el área legal.</p>
        <h2>Información del catálogo</h2>
        <p>Las imágenes, especificaciones y presentaciones publicadas son de carácter informativo y pueden cambiar sin previo aviso. La información vinculante es la que se confirma en la cotización formal emitida por {company.legalName}.</p>
        <h2>Cotizaciones</h2>
        <p>El envío de una solicitud no constituye un pedido. Precios, disponibilidad, tiempos de entrega y condiciones comerciales se confirman en la cotización enviada por un asesor.</p>
        <h2>Marcas</h2>
        <p>Las marcas mencionadas pertenecen a sus respectivos titulares.</p>
        <h2>Contacto</h2>
        <p>Para cualquier duda escriba a {company.email} o llame sin costo al {company.tollFree}.</p>
      </article>
    </>
  );
}
