import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, PhoneCall } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { AdvisorDirectory } from "@/components/quote/AdvisorDirectory";
import { company, fullAddress } from "@/data/company";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Pending } from "@/components/ui/Pending";

export const metadata: Metadata = {
  title: "Asesores y contacto",
  description: "Contacte directamente a un asesor de El Sauz por WhatsApp, teléfono o correo. Oficinas en Chihuahua, Chih. Lada sin costo 800 890 3276.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Asesores y contacto" }]}
        eyebrow="Asesores"
        title="Hable directo con su asesor"
        intro="Elija su estado y le mostramos al asesor de su zona. Puede escribirle por WhatsApp, llamarle o enviarle un correo."
      />

      <section className="container-x py-10">
        <AdvisorDirectory />
      </section>

      <section className="border-t border-line bg-mist">
        <div className="container-x grid grid-cols-1 gap-8 py-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-extrabold">Oficina y almacén en Chihuahua</h2>
            <ul className="mt-6 space-y-5">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" /><span><strong className="block">Dirección</strong>{fullAddress}</span></li>
              <li className="flex gap-3"><PhoneCall className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" /><span><strong className="block">Lada sin costo</strong><a href={company.tollFreeHref} className="text-brand-700 hover:underline">{company.tollFree}</a></span></li>
              <li className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" /><span><strong className="block">Teléfono local</strong><a href={company.phoneHref} className="text-brand-700 hover:underline">{company.phone}</a></span></li>
              <li className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" /><span><strong className="block">Correo</strong><a href={`mailto:${company.email}`} className="text-brand-700 hover:underline">{company.email}</a></span></li>
              <li className="flex gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" /><span><strong className="block">Horario <Pending /></strong>Lunes a viernes de 8:00 a 18:00 h<br />Sábados de 9:00 a 13:00 h</span></li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={waLink("Hola El Sauz, me gustaría recibir información.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><WhatsAppIcon /> WhatsApp</a>
              <a href={company.tollFreeHref} className="btn-primary"><Phone className="h-4 w-4" aria-hidden="true" /> Llamar sin costo</a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="card h-full min-h-[360px] overflow-hidden">
              <iframe
                title="Mapa de ubicación de El Sauz en Chihuahua"
                src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapsQuery)}&output=embed`}
                className="h-full min-h-[360px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
