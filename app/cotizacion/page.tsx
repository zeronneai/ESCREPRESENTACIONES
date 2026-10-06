import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { QuoteBuilder } from "@/components/quote/QuoteBuilder";

export const metadata: Metadata = {
  title: "Solicitar cotización",
  description: "Envíe su lista de productos y reciba precio, disponibilidad y tiempo de entrega de un asesor de El Sauz.",
  robots: { index: false, follow: true },
};

export default function CotizacionPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Cotización" }]}
        eyebrow="Solicitud de cotización"
        title="Revise su lista y envíela"
        intro="Ajuste cantidades, unidades y notas por partida. Le asignamos un folio y un asesor le da seguimiento."
      />
      <QuoteBuilder />
    </>
  );
}
