import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { company, fullAddress } from "@/data/company";

export const metadata: Metadata = { title: "Aviso de Privacidad", alternates: { canonical: "/aviso-de-privacidad" } };

export default function AvisoPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Aviso de Privacidad" }]} title="Aviso de Privacidad" intro="Aviso de Privacidad Integral conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares vigente." />
      <article className="container-x prose-sauz max-w-3xl py-10">
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">PENDIENTE: texto de referencia para el prototipo. Debe ser revisado y aprobado por el área legal de la empresa antes de publicarse.</p>
        <h2>Identidad y domicilio del responsable</h2>
        <p>{company.legalName} (en adelante, &ldquo;El Sauz&rdquo;), con domicilio en {fullAddress}, es responsable del tratamiento de sus datos personales.</p>
        <h2>Datos personales que recabamos</h2>
        <p>Para atender sus solicitudes de cotización y contacto recabamos: nombre, empresa, puesto, planta o ciudad, estado, correo electrónico, teléfono y, de forma opcional, RFC, así como los archivos que usted adjunte. No recabamos datos personales sensibles.</p>
        <h2>Finalidades del tratamiento</h2>
        <p>Finalidades primarias, necesarias para la relación comercial:</p>
        <ul>
          <li>Elaborar y dar seguimiento a cotizaciones.</li>
          <li>Asignarle un asesor comercial y contactarle por teléfono, correo o WhatsApp.</li>
          <li>Facturación y entrega de pedidos, en su caso.</li>
        </ul>
        <p>Finalidades secundarias: envío de información sobre productos y novedades. Si no desea que sus datos se usen para estas finalidades, puede indicarlo escribiendo a {company.email}.</p>
        <h2>Transferencias</h2>
        <p>Sus datos no se transfieren a terceros, salvo a proveedores que nos prestan servicios de envío de correo y hospedaje, quienes están obligados a mantener su confidencialidad, y en los casos previstos por la ley.</p>
        <h2>Derechos ARCO</h2>
        <p>Usted puede ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición, así como revocar su consentimiento, enviando una solicitud a {company.email} con su nombre, un medio para comunicarle la respuesta, una identificación oficial y la descripción clara de los datos y el derecho que desea ejercer. Responderemos en los plazos que establece la ley.</p>
        <h2>Uso de tecnologías de rastreo</h2>
        <p>Este sitio guarda su lista de cotización en el almacenamiento local de su navegador para que no la pierda al navegar. No utilizamos cookies de publicidad.</p>
        <h2>Cambios al aviso</h2>
        <p>Cualquier modificación a este aviso se publicará en esta misma página.</p>
        <p className="text-sm text-slate-500">Última actualización: PENDIENTE.</p>
      </article>
    </>
  );
}
