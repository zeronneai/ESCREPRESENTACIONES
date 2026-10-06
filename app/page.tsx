import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Search, ClipboardList, MessageCircle, Truck, ClipboardCheck, Boxes, Users, Phone } from "lucide-react";
import { categories } from "@/data/categories";
import { industries } from "@/data/industries";
import { getProductsBySlugs, products } from "@/data/products";
import { advisors } from "@/data/advisors";
import { company, yearsInBusiness } from "@/data/company";
import { SearchBox } from "@/components/catalog/SearchBox";
import { ProductCard } from "@/components/product/ProductCard";
import { Icon } from "@/components/ui/Icon";
import { Pending } from "@/components/ui/Pending";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { waLink } from "@/lib/whatsapp";

const FEATURED = [
  "wipe-poliester-sellado-laser",
  "overol-cuarto-limpio-reutilizable",
  "guante-nitrilo-sin-polvo",
  "bata-esd-poliester-fibra-carbono",
  "hisopo-espuma-cuarto-limpio",
  "tapete-adhesivo-30-hojas",
  "dedal-antiestatico-latex",
  "cubrebocas-cuarto-limpio",
];

const POPULAR = ["Wipes ISO 5", "Guante de nitrilo", "Bata ESD", "Tapete adhesivo", "Hisopo de espuma", "Cofia"];

export default function HomePage() {
  const featured = getProductsBySlugs(FEATURED);
  const heroImgs = getProductsBySlugs(["overol-cuarto-limpio-reutilizable", "wipe-poliester-sellado-laser", "guante-nitrilo-sin-polvo", "hisopo-espuma-cuarto-limpio"]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line bg-mist">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" aria-hidden="true" />
        <div className="container-x relative grid grid-cols-1 items-center gap-10 py-10 sm:py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold text-brand-700">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-600" aria-hidden="true" /> Desde {company.since} · Cobertura en los 32 estados
            </p>
            <h1 className="mt-5 text-[2.1rem] font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
              Consumibles para cuarto limpio, ESD y protección para la industria.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              Encuentre el producto, revise sus especificaciones y arme su lista de cotización en minutos. Un asesor con nombre y apellido le responde.
            </p>
            <div className="mt-7 max-w-2xl">
              <SearchBox size="lg" placeholder="Busque por producto, código o aplicación" />
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-slate-500">Lo más buscado:</span>
                {POPULAR.map((p) => (
                  <Link key={p} href={`/catalogo?q=${encodeURIComponent(p)}`} className="rounded-full border border-line bg-white px-3 py-1 text-slate-700 hover:border-brand-300 hover:text-brand-700">
                    {p}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/catalogo" className="btn-primary btn-lg">Ver catálogo <ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
              <Link href="/contacto" className="btn-outline btn-lg">Hablar con un asesor</Link>
            </div>
          </div>
          <div className="hidden lg:col-span-5 lg:block">
            <div className="grid grid-cols-2 gap-4">
              {heroImgs.map((p, i) => (
                <Link key={p.slug} href={`/producto/${p.slug}`} className={`card group overflow-hidden shadow-sm ${i % 2 === 1 ? "translate-y-8" : ""}`}>
                  <div className="relative aspect-square bg-mist">
                    <Image src={p.images[0]} alt={p.name.es} fill sizes="240px" unoptimized priority={i < 2} className="object-cover transition-transform group-hover:scale-105" />
                  </div>
                  <div className="border-t border-line px-3 py-2">
                    <p className="truncate text-xs font-semibold">{p.name.es}</p>
                    <p className="font-mono text-[11px] text-slate-500">{p.sku}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INDICADORES */}
      <section aria-label="Indicadores" className="border-b border-line bg-white">
        <div className="container-x grid grid-cols-2 divide-line py-6 md:grid-cols-4 md:divide-x">
          {[
            { value: `${yearsInBusiness()}+`, label: `años de experiencia, desde ${company.since}`, I: ClipboardCheck },
            { value: "32", label: "estados con cobertura de envío", I: Truck },
            { value: company.stats.brands, label: "marcas internacionales representadas", I: Boxes, pending: company.stats.brandsPending },
            { value: company.stats.responseTime, label: "tiempo de respuesta de cotización", I: MessageCircle, pending: company.stats.responseTimePending },
          ].map(({ value, label, I, pending }) => (
            <div key={label} className="flex items-center gap-3 px-2 py-3 md:px-6">
              <I className="h-8 w-8 shrink-0 text-brand-600" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <p className="font-display text-2xl font-extrabold text-ink sm:text-3xl">{value} {pending && <Pending />}</p>
                <p className="text-xs leading-snug text-slate-600 sm:text-sm">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="container-x py-14 sm:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Catálogo</p>
            <h2 className="mt-2 text-3xl font-extrabold">12 líneas de producto para su planta</h2>
          </div>
          <Link href="/catalogo" className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:underline">Ver todos los productos <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => {
            const n = products.filter((p) => p.category === c.slug).length;
            return (
              <li key={c.slug}>
                <Link href={`/catalogo/${c.slug}`} className="card group flex h-full flex-col p-4 transition hover:border-brand-300 hover:shadow-md sm:p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
                    <Icon name={c.icon} className="h-6 w-6" />
                  </span>
                  <span className="mt-4 font-display text-[15px] font-bold leading-snug sm:text-base">{c.name.es}</span>
                  <span className="mt-1 hidden text-sm text-slate-600 sm:block">{c.tagline}</span>
                  <span className="mt-3 text-xs font-medium text-slate-500">{n} productos de muestra</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="border-y border-line bg-mist">
        <div className="container-x py-14">
          <p className="eyebrow">Cotizar es simple</p>
          <h2 className="mt-2 text-3xl font-extrabold">De la búsqueda a la cotización en tres pasos</h2>
          <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { I: Search, t: "Encuentre el producto", d: "Busque por nombre, código o aplicación. Filtre por clase de cuarto limpio, ESD o material." },
              { I: ClipboardList, t: "Arme su lista", d: "Elija la presentación exacta, la cantidad y la unidad. Agregue notas por partida." },
              { I: MessageCircle, t: "Reciba su cotización", d: "Envíela con un clic o por WhatsApp. Le asignamos un folio y un asesor le da seguimiento." },
            ].map(({ I, t, d }, i) => (
              <li key={t} className="card relative p-6">
                <span className="absolute right-5 top-4 font-display text-5xl font-extrabold text-brand-100">{i + 1}</span>
                <I className="h-8 w-8 text-brand-600" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold">{t}</h3>
                <p className="mt-1.5 text-sm text-slate-600">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="container-x py-14 sm:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Más cotizados</p>
            <h2 className="mt-2 text-3xl font-extrabold">Productos de alto consumo en planta</h2>
          </div>
          <Link href="/catalogo" className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:underline">Ir al catálogo <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* INDUSTRIAS */}
      <section className="bg-brand-800 text-white">
        <div className="container-x py-14 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-200">Industrias que atendemos</p>
          <h2 className="mt-2 max-w-2xl text-3xl font-extrabold text-white">Conocemos los requisitos de su proceso</h2>
          <p className="mt-3 max-w-2xl text-brand-100">Maquiladoras y plantas de manufactura de electrónica, automotriz, dispositivos médicos y aeroespacial, además de laboratorios y alimentos.</p>
          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((i) => (
              <li key={i.slug}>
                <Link href={`/industrias/${i.slug}`} className="group flex h-full gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
                  <Icon name={i.icon} className="h-8 w-8 shrink-0 text-brand-200" />
                  <span>
                    <span className="flex items-center gap-1 font-display text-lg font-bold">{i.name} <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" aria-hidden="true" /></span>
                    <span className="mt-1 block text-sm text-brand-100">{i.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MARCAS */}
      <section className="border-b border-line">
        <div className="container-x py-12">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Marcas internacionales que representamos</p>
            <Pending label="PENDIENTE: confirmar marcas" />
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {["Marca A", "Marca B", "Marca C", "Marca D", "Marca E", "Marca F"].map((m) => (
              <li key={m} className="flex h-20 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-mist font-display text-lg font-bold text-slate-400">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CALIDAD */}
      <section className="container-x py-14 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Calidad</p>
            <h2 className="mt-2 text-3xl font-extrabold">En proceso de certificación ISO 9001</h2>
            <p className="mt-4 text-lg text-slate-600">
              Trabajamos bajo un Sistema de Gestión de Calidad alineado a ISO 9001. Para usted significa menos sorpresas en recepción y más evidencia para sus auditorías.
            </p>
            <Link href="/calidad" className="btn-outline mt-6">Conozca nuestro compromiso de calidad <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { t: "Trazabilidad", d: "Registro de lote del fabricante en cada entrega, para responder rápido ante una auditoría o un reclamo." },
              { t: "Proveedores evaluados", d: "Seleccionamos y evaluamos periódicamente a los fabricantes internacionales que representamos." },
              { t: "Control en recepción", d: "Inspección de la mercancía al llegar a nuestro almacén, antes de enviarla a su planta." },
            ].map((x) => (
              <li key={x.t} className="card p-5">
                <ShieldCheck className="h-7 w-7 text-brand-600" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-3 font-bold">{x.t}</h3>
                <p className="mt-1 text-sm text-slate-600">{x.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ASESORES */}
      <section className="border-y border-line bg-mist">
        <div className="container-x grid grid-cols-1 gap-10 py-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Atención personal</p>
            <h2 className="mt-2 text-3xl font-extrabold">Hable con una persona, no con un formulario</h2>
            <p className="mt-4 text-slate-600">Cada zona del país tiene un asesor asignado que conoce su proceso. Escríbale por WhatsApp, llámele o envíele un correo directo.</p>
            <Link href="/contacto" className="btn-primary mt-6"><Users className="h-4 w-4" aria-hidden="true" /> Ver directorio de asesores</Link>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7">
            {advisors.slice(0, 4).map((a) => (
              <li key={a.id} className="card flex items-center gap-4 p-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-100 font-display text-lg font-bold text-brand-700" aria-hidden="true">
                  {a.specialty.replace("Zona ", "").slice(0, 2).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{a.specialty}</p>
                  <p className="text-xs text-slate-500">Nombre y foto <Pending /></p>
                  <div className="mt-2 flex gap-2">
                    <a href={waLink(`Hola, busco al asesor de ${a.specialty}.`, a.whatsapp)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-[#0e733c] hover:underline"><WhatsAppIcon className="h-4 w-4" /> WhatsApp</a>
                    <a href={`tel:${a.phone}`} className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:underline"><Phone className="h-3.5 w-3.5" aria-hidden="true" /> Llamar</a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="container-x py-14 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 px-6 py-12 text-center text-white sm:px-12">
          <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold text-white sm:text-4xl">¿Tiene una requisición pendiente?</h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-100">Arme su lista en el catálogo o adjunte su requisición en el formulario. Le respondemos con precio, disponibilidad y tiempo de entrega.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/cotizacion" className="btn-accent btn-lg"><ClipboardList className="h-5 w-5" aria-hidden="true" /> Cotiza ahora</Link>
              <a href={waLink("Hola El Sauz, me gustaría hablar con un asesor.")} target="_blank" rel="noopener noreferrer" className="btn-ghost-light btn-lg"><WhatsAppIcon /> Habla con un asesor</a>
            </div>
            <p className="mt-6 text-sm text-brand-100">O llame sin costo al <a href={company.tollFreeHref} className="font-bold text-white underline">{company.tollFree}</a></p>
          </div>
        </div>
      </section>
    </>
  );
}
