import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Linkedin, Facebook, Instagram } from "lucide-react";
import { categories } from "@/data/categories";
import { company, fullAddress } from "@/data/company";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-ink text-slate-300">
      <div className="container-x grid grid-cols-1 gap-10 py-14 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-display text-2xl font-extrabold text-white">El Sauz</p>
          <p className="mt-1 text-sm text-slate-400">{company.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Distribuidor y representante exclusivo de marcas internacionales de consumibles para cuarto limpio, control ESD, protección personal y textiles especiales. Desde {company.since}, con cobertura en los 32 estados de México.
          </p>
          <div className="mt-5 flex gap-2">
            {[
              { href: company.social.linkedin, label: "LinkedIn", I: Linkedin },
              { href: company.social.facebook, label: "Facebook", I: Facebook },
              { href: company.social.instagram, label: "Instagram", I: Instagram },
            ].map(({ href, label, I }) => (
              <a key={label} href={href} aria-label={`${label} (PENDIENTE: confirmar perfil)`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 hover:bg-white/10">
                <I className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-white">Categorías</p>
          <ul className="mt-4 grid grid-cols-1 gap-1.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}><Link href={`/catalogo/${c.slug}`} className="hover:text-white">{c.name.es}</Link></li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-white">El Sauz</p>
          <ul className="mt-4 space-y-1.5 text-sm">
            <li><Link href="/catalogo" className="hover:text-white">Catálogo</Link></li>
            <li><Link href="/cotizacion" className="hover:text-white">Solicitar cotización</Link></li>
            <li><Link href="/contacto" className="hover:text-white">Asesores</Link></li>
            <li><Link href="/nosotros" className="hover:text-white">Nosotros</Link></li>
            <li><Link href="/calidad" className="hover:text-white">Calidad</Link></li>
            <li><Link href="/recursos" className="hover:text-white">Recursos y descargas</Link></li>
            <li><Link href="/industrias" className="hover:text-white">Industrias</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-white">Contacto</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" /><span>{fullAddress}</span></li>
            <li className="flex gap-2.5"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" /><span>Sin costo <a href={company.tollFreeHref} className="font-semibold text-white hover:underline">{company.tollFree}</a><br />Local <a href={company.phoneHref} className="hover:text-white hover:underline">{company.phone}</a></span></li>
            <li className="flex gap-2.5"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" /><a href={`mailto:${company.email}`} className="hover:text-white hover:underline">{company.email}</a></li>
            <li className="flex gap-2.5"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" /><span>Lunes a viernes, 8:00 a 18:00 h <span className="pending ml-1">Pendiente</span></span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 pb-24 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:pb-6">
          <p>© {year} {company.legalName} Todos los derechos reservados.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            <li><Link href="/aviso-de-privacidad" className="hover:text-white">Aviso de Privacidad</Link></li>
            <li><Link href="/terminos" className="hover:text-white">Términos de uso</Link></li>
            <li><Link href="/calidad" className="hover:text-white">Política de calidad</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
