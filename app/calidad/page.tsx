import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardCheck, Search, PackageCheck, Barcode, FileCheck2, RefreshCcw, Info } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pending } from "@/components/ui/Pending";

export const metadata: Metadata = {
  title: "Calidad",
  description: "El Sauz trabaja bajo un Sistema de Gestión de Calidad alineado a ISO 9001 y se encuentra en proceso de certificación. Evaluación de proveedores, control en recepción y trazabilidad por lote.",
  alternates: { canonical: "/calidad" },
};

const FLOW = [
  { I: Search, t: "Selección y evaluación de proveedores", d: "Evaluamos a cada fabricante internacional antes de representarlo: capacidad técnica, certificaciones propias, consistencia del producto y cumplimiento de entregas. La evaluación se repite periódicamente." },
  { I: FileCheck2, t: "Documentación técnica", d: "Solicitamos y resguardamos fichas técnicas, hojas de seguridad y certificados de análisis por lote cuando el fabricante los emite." },
  { I: PackageCheck, t: "Control en recepción", d: "Al llegar a nuestro almacén, la mercancía se inspecciona: código, cantidad, empaque, etiquetado y estado general, contra la orden de compra." },
  { I: Barcode, t: "Trazabilidad por lote", d: "Registramos el lote del fabricante de cada entrega. Si su auditoría o un reclamo lo requiere, podemos identificar qué lote recibió y cuándo." },
  { I: ClipboardCheck, t: "Atención a quejas y no conformidades", d: "Cada reclamo se registra, se analiza su causa y se documenta la acción correctiva con el fabricante." },
  { I: RefreshCcw, t: "Mejora continua", d: "Medimos tiempo de respuesta, entregas a tiempo y satisfacción del cliente para mejorar el servicio." },
];

export default function CalidadPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Calidad" }]}
        eyebrow="Sistema de Gestión de Calidad"
        title="En proceso de certificación ISO 9001"
        intro="Trabajamos bajo un Sistema de Gestión de Calidad alineado a ISO 9001. Nuestro objetivo es que cada entrega llegue a su planta conforme, documentada y rastreable."
      />

      <section className="container-x py-10">
        <p className="flex items-start gap-2 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-900">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          ESC Representaciones se encuentra en proceso de certificación ISO 9001. Esta página describe nuestro compromiso y prácticas actuales; no representa una certificación otorgada.
        </p>
      </section>

      <section className="container-x grid grid-cols-1 gap-10 pb-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold">Política de calidad</h2>
            <Pending />
          </div>
          <blockquote className="mt-4 border-l-4 border-brand-600 pl-5 text-lg leading-relaxed text-slate-700">
            En ESC Representaciones nos comprometemos a satisfacer los requisitos de nuestros clientes suministrando productos de marcas líderes con un servicio confiable y asesoría técnica, cumpliendo los requisitos aplicables y mejorando continuamente la eficacia de nuestro Sistema de Gestión de Calidad.
          </blockquote>
          <p className="mt-3 text-xs text-slate-500">Texto de ejemplo. Sustituir por la política aprobada por la Dirección.</p>

          <h2 className="mt-10 text-2xl font-extrabold">Qué significa para usted</h2>
          <ul className="mt-4 space-y-3 text-slate-700">
            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />Menos rechazos en su recepción: revisamos antes de enviar.</li>
            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />Evidencia para sus auditorías de cliente: fichas, hojas de seguridad y lote.</li>
            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />Proveedores evaluados y respaldados por El Sauz.</li>
            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />Atención documentada de cualquier reclamo.</li>
          </ul>
        </div>
        <div className="lg:col-span-7">
          <h2 className="text-2xl font-extrabold">Cómo cuidamos cada entrega</h2>
          <ol className="mt-6 space-y-3">
            {FLOW.map(({ I, t, d }, i) => (
              <li key={t} className="card flex gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><I className="h-5 w-5" aria-hidden="true" /></span>
                <div>
                  <p className="text-xs font-bold text-brand-600">Paso {i + 1}</p>
                  <h3 className="font-bold">{t}</h3>
                  <p className="mt-1 text-sm text-slate-600">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line bg-mist">
        <div className="container-x flex flex-col items-start justify-between gap-4 py-10 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold">¿Necesita documentación para una auditoría?</h2>
            <p className="mt-1 text-slate-600">Pida fichas técnicas, hojas de seguridad o información de lote a su asesor.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/recursos#descargas" className="btn-outline">Centro de descargas</Link>
            <Link href="/contacto" className="btn-primary">Contactar a un asesor</Link>
          </div>
        </div>
      </section>
    </>
  );
}
