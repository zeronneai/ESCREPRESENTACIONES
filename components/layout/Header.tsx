"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, ChevronDown, ClipboardList, ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { industries } from "@/data/industries";
import { company } from "@/data/company";
import { SearchBox } from "@/components/catalog/SearchBox";
import { Icon } from "@/components/ui/Icon";
import { useQuote } from "@/lib/quote-store";
import { useHydrated } from "@/lib/use-hydrated";

const NAV = [
  { href: "/calidad", label: "Calidad" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/recursos", label: "Recursos" },
  { href: "/contacto", label: "Asesores y contacto" },
];

function QuoteCount() {
  const hydrated = useHydrated();
  const count = useQuote((s) => s.items.length);
  if (!hydrated || count === 0) return null;
  return (
    <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[11px] font-bold text-white ring-2 ring-white" aria-label={`${count} partidas en su cotización`}>
      {count}
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mega, setMega] = useState<null | "productos" | "industrias">(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => { setMega(null); setMobile(false); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setMega(null), setMobile(false));
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85" onMouseLeave={() => setMega(null)}>
      {/* Barra superior */}
      <div className="hidden bg-brand-800 text-white md:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <p className="text-white/85">Distribuidor y representante de marcas internacionales desde {company.since}. Envíos a los 32 estados.</p>
          <div className="flex items-center gap-5">
            <a href={company.tollFreeHref} className="inline-flex items-center gap-1.5 font-semibold hover:underline"><Phone className="h-3.5 w-3.5" aria-hidden="true" /> Sin costo {company.tollFree}</a>
            <a href={company.phoneHref} className="hover:underline">{company.phone}</a>
            <a href={`mailto:${company.email}`} className="inline-flex items-center gap-1.5 hover:underline"><Mail className="h-3.5 w-3.5" aria-hidden="true" /> {company.email}</a>
          </div>
        </div>
      </div>

      {/* Fila principal */}
      <div className="border-b border-line">
        <div className="container-x flex h-16 items-center gap-4 lg:h-20 lg:gap-8">
          <button className="-ml-2 rounded-lg p-2 text-ink lg:hidden" onClick={() => setMobile(true)} aria-label="Abrir menú" aria-expanded={mobile}>
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="El Sauz, ESC Representaciones. Ir al inicio">
            <Image src="/brand/logo-esc.png" alt="ESC" width={333} height={96} priority className="h-8 w-auto lg:h-10" />
            <span className="hidden border-l border-line pl-3 leading-tight sm:block">
              <span className="block font-display text-base font-extrabold text-brand-700">El Sauz</span>
              <span className="block text-[11px] text-slate-500">Calidad, Servicio y Marcas Líderes</span>
            </span>
          </Link>
          <div className="hidden flex-1 md:block">
            <SearchBox />
          </div>
          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <a href={company.tollFreeHref} className="hidden flex-col items-end leading-tight xl:flex">
              <span className="text-[11px] text-slate-500">Llámenos sin costo</span>
              <span className="font-display text-base font-bold text-brand-700">{company.tollFree}</span>
            </a>
            <a href={company.tollFreeHref} className="rounded-lg p-2 text-brand-700 md:hidden" aria-label={`Llamar sin costo al ${company.tollFree}`}>
              <Phone className="h-5 w-5" />
            </a>
            <Link href="/cotizacion" className="btn-accent relative ml-1">
              <ClipboardList className="h-4 w-4" aria-hidden="true" />
              <span>Cotizar</span>
              <QuoteCount />
            </Link>
          </div>
        </div>
        <div className="container-x pb-3 md:hidden">
          <SearchBox placeholder="Buscar producto o código" />
        </div>
      </div>

      {/* Navegación de escritorio */}
      <nav aria-label="Principal" className="relative hidden border-b border-line bg-white lg:block">
        <div className="container-x flex h-12 items-center gap-1 text-sm font-medium">
          <button
            className={`inline-flex h-full items-center gap-1.5 border-b-2 px-3 ${mega === "productos" ? "border-brand-600 text-brand-700" : "border-transparent hover:text-brand-700"}`}
            onMouseEnter={() => setMega("productos")}
            onClick={() => setMega(mega === "productos" ? null : "productos")}
            aria-expanded={mega === "productos"}
          >
            Productos <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            className={`inline-flex h-full items-center gap-1.5 border-b-2 px-3 ${mega === "industrias" ? "border-brand-600 text-brand-700" : "border-transparent hover:text-brand-700"}`}
            onMouseEnter={() => setMega("industrias")}
            onClick={() => setMega(mega === "industrias" ? null : "industrias")}
            aria-expanded={mega === "industrias"}
          >
            Industrias <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onMouseEnter={() => setMega(null)} className={`inline-flex h-full items-center border-b-2 px-3 ${pathname.startsWith(n.href) ? "border-brand-600 text-brand-700" : "border-transparent hover:text-brand-700"}`}>
              {n.label}
            </Link>
          ))}
          <Link href="/catalogo" onMouseEnter={() => setMega(null)} className="ml-auto inline-flex items-center gap-1 text-brand-700 hover:underline">
            Ver catálogo completo <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {mega === "productos" && (
          <div className="absolute inset-x-0 top-full border-b border-line bg-white shadow-xl">
            <div className="container-x grid grid-cols-4 gap-x-6 gap-y-5 py-6">
              {categories.map((c) => (
                <div key={c.slug}>
                  <Link href={`/catalogo/${c.slug}`} className="group flex items-center gap-2.5 font-semibold text-ink hover:text-brand-700">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700 group-hover:bg-brand-100"><Icon name={c.icon} className="h-5 w-5" /></span>
                    {c.name.es}
                  </Link>
                  <ul className="mt-2 space-y-1 pl-[46px] text-[13px] text-slate-600">
                    {c.subcategories.slice(0, 3).map((s) => (
                      <li key={s}><Link href={`/catalogo/${c.slug}?sub=${encodeURIComponent(s)}`} className="hover:text-brand-700">{s}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
        {mega === "industrias" && (
          <div className="absolute inset-x-0 top-full border-b border-line bg-white shadow-xl">
            <div className="container-x grid grid-cols-3 gap-4 py-6">
              {industries.map((i) => (
                <Link key={i.slug} href={`/industrias/${i.slug}`} className="group flex gap-3 rounded-xl p-3 hover:bg-mist">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700"><Icon name={i.icon} className="h-5 w-5" /></span>
                  <span>
                    <span className="block font-semibold group-hover:text-brand-700">{i.name}</span>
                    <span className="block text-[13px] text-slate-600">{i.summary}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Menú móvil */}
      {mobile && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menú">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobile(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <Image src="/brand/logo-esc.png" alt="ESC" width={333} height={96} className="h-8 w-auto" />
              <button onClick={() => setMobile(false)} className="rounded-lg p-2" aria-label="Cerrar menú"><X className="h-6 w-6" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <p className="eyebrow mb-2">Productos</p>
              <ul className="grid grid-cols-1 gap-1">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/catalogo/${c.slug}`} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-mist">
                      <Icon name={c.icon} className="h-5 w-5 text-brand-700" /> <span className="text-sm font-medium">{c.name.es}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="eyebrow mb-2 mt-6">Industrias</p>
              <ul className="grid grid-cols-2 gap-1">
                {industries.map((i) => (
                  <li key={i.slug}><Link href={`/industrias/${i.slug}`} className="block rounded-lg px-2 py-2 text-sm hover:bg-mist">{i.name}</Link></li>
                ))}
              </ul>
              <p className="eyebrow mb-2 mt-6">El Sauz</p>
              <ul className="grid gap-1">
                {[{ href: "/catalogo", label: "Catálogo completo" }, ...NAV].map((n) => (
                  <li key={n.href}><Link href={n.href} className="block rounded-lg px-2 py-2 text-sm font-medium hover:bg-mist">{n.label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="space-y-2 border-t border-line p-4">
              <a href={company.tollFreeHref} className="btn-outline w-full"><Phone className="h-4 w-4" aria-hidden="true" /> Sin costo {company.tollFree}</a>
              <Link href="/cotizacion" className="btn-accent w-full"><ClipboardList className="h-4 w-4" aria-hidden="true" /> Ver mi cotización</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
