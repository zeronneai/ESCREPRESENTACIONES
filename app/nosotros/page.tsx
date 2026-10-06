import type { Metadata } from "next";
import Link from "next/link";
import { Target, Eye, HeartHandshake, ShieldCheck, Clock3, Users, Lightbulb } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { MexicoCoverage } from "@/components/ui/MexicoCoverage";
import { Pending } from "@/components/ui/Pending";
import { company, yearsInBusiness } from "@/data/company";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "ESC Representaciones (El Sauz): distribuidor y representante exclusivo de marcas internacionales desde 1999, con base en Chihuahua y cobertura en los 32 estados.",
  alternates: { canonical: "/nosotros" },
};

const TIMELINE = [
  { year: "1999", title: "Fundación en Chihuahua", text: "Nace ESC Representaciones para abastecer a la industria maquiladora de Chihuahua con material indirecto de calidad.", confirmed: true },
  { year: "2000s", title: "Representación de marcas internacionales", text: "Se incorporan marcas exclusivas de consumibles para cuarto limpio y control ESD.", confirmed: false },
  { year: "2010s", title: "Cobertura nacional", text: "Se amplía la operación para atender plantas en el norte, el Bajío y el centro del país.", confirmed: false },
  { year: "2020s", title: "División Salud y telas especiales", text: "Se suman líneas para laboratorios, clínicas y textiles técnicos.", confirmed: false },
  { year: String(new Date().getFullYear()), title: "Sistema de Gestión de Calidad", text: "En proceso de certificación ISO 9001 y lanzamiento del nuevo catálogo virtual con cotización en línea.", confirmed: true },
];

const VALUES = [
  { I: ShieldCheck, t: "Calidad", d: "Productos de marcas líderes y procesos controlados de principio a fin." },
  { I: Clock3, t: "Cumplimiento", d: "Lo que prometemos en tiempo de entrega, lo cumplimos." },
  { I: HeartHandshake, t: "Servicio", d: "Un asesor que conoce su proceso y le da seguimiento personal." },
  { I: Lightbulb, t: "Asesoría técnica", d: "Le ayudamos a elegir el producto correcto, no solo a venderlo." },
];

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Nosotros" }]}
        eyebrow={`Desde ${company.since}`}
        title={`${yearsInBusiness()} años abasteciendo a la industria mexicana`}
        intro="ESC Representaciones, S. de R.L. MI., con su marca El Sauz, es distribuidor y representante exclusivo de marcas internacionales de consumibles para procesos productivos, equipo de protección y textiles especiales."
      />

      <section className="container-x grid grid-cols-1 gap-12 py-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">Nuestra historia</p>
          <h2 className="mt-2 text-3xl font-extrabold">De Chihuahua a los 32 estados</h2>
          <p className="mt-4 text-slate-700">
            Desde {company.since} acompañamos a maquiladoras y plantas de manufactura de electrónica, automotriz, dispositivos médicos y aeroespacial, además de laboratorios y el sector salud. Nos especializamos en material indirecto para limpieza en procesos productivos, equipo de protección y textiles especiales.
          </p>
          <p className="mt-3 text-sm text-slate-500">Los hitos intermedios de la línea de tiempo son ilustrativos. <Pending label="Pendiente: confirmar fechas" /></p>
        </div>
        <ol className="relative border-l-2 border-brand-100 pl-8 lg:col-span-7">
          {TIMELINE.map((e) => (
            <li key={e.year} className="relative mb-8 last:mb-0">
              <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-4 border-white bg-brand-600 ring-2 ring-brand-100" aria-hidden="true" />
              <p className="font-display text-sm font-extrabold text-brand-600">{e.year} {!e.confirmed && <Pending />}</p>
              <h3 className="mt-1 text-lg font-bold">{e.title}</h3>
              <p className="mt-1 text-slate-600">{e.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-line bg-mist">
        <div className="container-x grid grid-cols-1 gap-4 py-14 md:grid-cols-2">
          <div className="card p-6">
            <Target className="h-8 w-8 text-brand-600" strokeWidth={1.5} aria-hidden="true" />
            <h2 className="mt-3 text-xl font-bold">Misión <Pending /></h2>
            <p className="mt-2 text-slate-700">Abastecer a la industria con consumibles y equipo de protección de marcas líderes, con asesoría técnica, entregas confiables y un servicio cercano que ayude a nuestros clientes a cumplir sus estándares de calidad.</p>
          </div>
          <div className="card p-6">
            <Eye className="h-8 w-8 text-brand-600" strokeWidth={1.5} aria-hidden="true" />
            <h2 className="mt-3 text-xl font-bold">Visión <Pending /></h2>
            <p className="mt-2 text-slate-700">Ser el socio de referencia en México para el abasto de material indirecto en ambientes controlados, reconocido por la calidad de sus marcas y la confianza de sus clientes.</p>
          </div>
        </div>
        <div className="container-x pb-14">
          <h2 className="text-2xl font-extrabold">Valores <Pending /></h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ I, t, d }) => (
              <li key={t} className="card p-5">
                <I className="h-7 w-7 text-brand-600" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-3 font-bold">{t}</h3>
                <p className="mt-1 text-sm text-slate-600">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x grid grid-cols-1 items-center gap-10 py-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">Cobertura nacional</p>
          <h2 className="mt-2 text-3xl font-extrabold">Enviamos a los 32 estados</h2>
          <p className="mt-4 text-slate-700">Desde nuestro almacén en Chihuahua surtimos a plantas en todo el país, con asesores asignados por zona: Chihuahua, Juárez, Noreste y Bajío y Centro.</p>
          <Link href="/contacto" className="btn-primary mt-6">Encontrar a mi asesor</Link>
        </div>
        <div className="lg:col-span-8"><MexicoCoverage /></div>
      </section>

      <section className="border-t border-line bg-mist">
        <div className="container-x py-14">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-extrabold">Nuestro equipo</h2>
            <Pending label="Pendiente: fotos y nombres" />
          </div>
          <p className="mt-2 max-w-2xl text-slate-600">Personas reales detrás de cada cotización. Aquí se mostrarán dirección, compras, almacén y el equipo comercial.</p>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {["Dirección General", "Gerencia Comercial", "Compras Internacionales", "Calidad", "Almacén y Logística", "Atención a Clientes"].map((r) => (
              <li key={r} className="text-center">
                <span className="mx-auto flex aspect-square w-full max-w-[140px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-slate-300"><Users className="h-10 w-10" strokeWidth={1.3} aria-hidden="true" /></span>
                <p className="mt-2 text-sm font-semibold">{r}</p>
                <p className="text-xs text-slate-500">Nombre pendiente</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
